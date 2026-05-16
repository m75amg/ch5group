#!/usr/bin/env bash
#
# Deploy script for the Channel5 Korea corporate site on the EC2 instance
# (Ubuntu 24.04 + Node 22 + pnpm + PM2 + Nginx + PostgreSQL 16).
#
# Assumes the working tree lives at the path this script is run from and that
# the .env file is already populated with DATABASE_URL, NEXTAUTH_SECRET,
# NEXTAUTH_URL, NEXT_PUBLIC_SITE_URL, and (optionally) Resend / GA4 / Clarity
# / reCAPTCHA credentials.
#
# Usage:
#   ./deploy.sh
#
set -euo pipefail

cd "$(dirname "$0")"

log() { printf "\033[1;34m[deploy]\033[0m %s\n" "$*"; }

log "git fetch + reset to origin/main"
git fetch origin
git reset --hard origin/main

log "pnpm install (frozen lockfile)"
pnpm install --frozen-lockfile

log "prisma generate"
pnpm exec prisma generate

log "prisma migrate deploy (apply pending migrations)"
pnpm exec prisma migrate deploy

log "next build"
pnpm build

log "pm2 reload (zero-downtime)"
if pm2 describe ch5-site >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
  pm2 save
fi

log "done — pm2 status:"
pm2 status ch5-site
