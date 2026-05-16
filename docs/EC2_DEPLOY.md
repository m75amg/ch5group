# EC2 배포 가이드

채널5코리아 회사 사이트를 EC2 인스턴스(`43.202.205.18` / `ch5group.com`)에 배포하는 절차입니다. **첫 배포 시에만 한 번** 수행하는 단계와 **이후 매 배포마다** 반복되는 단계를 구분합니다.

---

## 0. 전제

| 항목 | 상태 |
|---|---|
| Ubuntu 24.04 LTS | ✅ |
| Node.js 22 (nvm 또는 시스템) | ✅ |
| Nginx | ✅ |
| PM2 | ✅ |
| Let's Encrypt for `ch5group.com` | ✅ |
| 기존 Astro placeholder + 기존 `deploy.sh` | ⚠️ 새 코드로 교체됨 |
| PostgreSQL 16 | ❌ **추가 설치 필요** |
| pnpm | ❌ **추가 설치 필요** |

---

## 1. EC2 첫 셋업 (한 번만)

### 1-1. SSH 접속

```bash
ssh -i ~/.ssh/your-key.pem ubuntu@43.202.205.18
```

### 1-2. pnpm 설치

```bash
corepack enable pnpm
pnpm --version  # 9.x or higher
```

(Node 22가 이미 있으니 corepack도 같이 포함됩니다.)

### 1-3. PostgreSQL 16 설치

```bash
sudo apt update
sudo apt install -y postgresql-16 postgresql-contrib-16
sudo systemctl enable --now postgresql
```

DB / 사용자 생성:

```bash
sudo -u postgres psql <<'EOF'
CREATE USER ch5 WITH PASSWORD '<<STRONG_PASSWORD>>';
CREATE DATABASE ch5korea OWNER ch5;
GRANT ALL PRIVILEGES ON DATABASE ch5korea TO ch5;
EOF
```

> 비밀번호는 `openssl rand -base64 24`로 생성하세요. 이 값을 곧 `.env`의 `DATABASE_URL`에 넣습니다.

### 1-4. 레포 clone (또는 기존 디렉토리에 새 origin 연결)

기존 Astro placeholder 디렉토리(`/home/ubuntu/ch5group`)를 그대로 사용한다면 main만 새로 받으면 됩니다:

```bash
cd /home/ubuntu/ch5group
git fetch origin
git reset --hard origin/main   # main 브랜치에 Next.js 코드가 머지된 뒤
```

(처음 만든다면 `git clone git@github.com:m75amg/ch5group.git`)

### 1-5. `.env` 작성 (인스턴스 전용)

```bash
cd /home/ubuntu/ch5group
cat > .env <<'EOF'
NEXT_PUBLIC_SITE_URL=https://ch5group.com

DATABASE_URL=postgresql://ch5:<<위에서 만든 비밀번호>>@localhost:5432/ch5korea?schema=public

NEXTAUTH_SECRET=<<openssl rand -base64 32 결과>>
NEXTAUTH_URL=https://ch5group.com

# 선택: 운영 환경에 키 발급되면 채우기
RESEND_API_KEY=
RESEND_FROM_EMAIL=Channel5 Korea <noreply@ch5group.com>
OPERATIONS_INBOX_EMAIL=partnership@channel5korea.com
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
EOF

chmod 600 .env   # 보호
```

### 1-6. 첫 의존성 설치 + 마이그레이션 + 시드

```bash
pnpm install --frozen-lockfile
pnpm exec prisma generate
pnpm exec prisma migrate deploy
SEED_ADMIN_EMAIL=admin@ch5group.com SEED_ADMIN_PASSWORD='<<강력한 비밀번호>>' \
  pnpm db:seed
```

> 시드는 **재실행 안전** (upsert 기반). 관리자 계정 패스워드는 시드 실행 시점 환경변수로만 결정.

### 1-7. 첫 빌드 + PM2 등록

```bash
pnpm build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd    # 출력된 명령을 sudo로 한 번 실행 (재부팅 시 자동 시작)
```

### 1-8. Nginx 설정

기존 Astro용 설정을 교체:

```bash
sudo cp docs/nginx-ch5group.conf /etc/nginx/sites-available/ch5group.conf
sudo ln -sf /etc/nginx/sites-available/ch5group.conf /etc/nginx/sites-enabled/ch5group.conf
sudo rm -f /etc/nginx/sites-enabled/default  # 필요 시
sudo nginx -t
sudo systemctl reload nginx
```

### 1-9. 검증

브라우저에서:
- https://ch5group.com → 새 Next.js 사이트
- https://ch5group.com/admin → 로그인 화면
- 로그인 (1-6에서 설정한 계정) → 대시보드
- /admin/stats 에서 값 수정 → /ko 새로고침하면 즉시 반영

---

## 2. 이후 매 배포 (이미 셋업된 인스턴스)

GitHub `main`에 새 커밋이 푸시된 뒤:

```bash
ssh ubuntu@43.202.205.18
cd /home/ubuntu/ch5group
./deploy.sh
```

`deploy.sh`가 자동으로:

1. `git pull` (origin/main으로 reset --hard)
2. `pnpm install --frozen-lockfile`
3. `prisma generate`
4. `prisma migrate deploy` (대기 중인 마이그레이션 적용)
5. `pnpm build`
6. `pm2 reload ecosystem.config.cjs --update-env` (zero-downtime)

오류 시 `pm2 logs ch5-site` 또는 `tail -100 logs/ch5-site.error.log`.

---

## 3. 일반 운영 명령

```bash
# 프로세스 상태
pm2 status ch5-site

# 로그 실시간
pm2 logs ch5-site

# 메모리/CPU
pm2 monit

# 재시작 (코드 변경 없이)
pm2 restart ch5-site

# 환경변수 반영 (.env 수정 후)
pm2 reload ecosystem.config.cjs --update-env

# DB 직접 접속
psql -U ch5 -d ch5korea

# Prisma Studio (DB GUI, 로컬에서 SSH 터널)
# 로컬에서: ssh -L 5555:localhost:5555 ubuntu@43.202.205.18
# EC2에서:  pnpm db:studio
```

---

## 4. PostgreSQL 백업 (권장)

매일 새벽 백업 cron:

```bash
sudo crontab -e
# 추가:
0 3 * * * pg_dump -U ch5 ch5korea | gzip > /home/ubuntu/backups/ch5korea-$(date +\%Y\%m\%d).sql.gz
```

`/home/ubuntu/backups` 디렉토리는 미리 생성 (`mkdir -p /home/ubuntu/backups`).

---

## 5. 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| `pm2 status`에 ch5-site 없음 | 첫 셋업 1-7 미실행. `pm2 start ecosystem.config.cjs` |
| 502 Bad Gateway | Next.js 프로세스 다운. `pm2 logs ch5-site` 확인 |
| /admin/login 무한 리다이렉트 | `NEXTAUTH_URL` 이 `https://ch5group.com`과 정확히 일치하는지 확인 |
| DB 연결 실패 | `psql -U ch5 -d ch5korea` 직접 시도. PostgreSQL 16 실행 상태(`systemctl status postgresql`) 확인 |
| 마이그레이션 충돌 | `prisma migrate status`로 상태 확인. 필요 시 `prisma migrate resolve --applied <name>` |
| 이미지 업로드 실패 | `/home/ubuntu/ch5group/public/uploads/` 쓰기 권한 확인 (`chown -R ubuntu:ubuntu`) |

---

## 6. 보안 체크

- [ ] `.env` 권한 600 (소유자 ubuntu)
- [ ] PostgreSQL은 localhost(127.0.0.1)만 listen (기본값)
- [ ] PM2가 root 아닌 ubuntu로 실행
- [ ] `NEXTAUTH_SECRET`는 절대 git에 커밋하지 않음
- [ ] 시드 계정 비밀번호를 첫 로그인 후 어드민에서 변경 (현재 어드민 UI에 비밀번호 변경 없음 — 직접 DB 또는 별도 스크립트로)
- [ ] PG 백업 cron 동작 확인
- [ ] EC2 Security Group에 22/80/443만 열림
