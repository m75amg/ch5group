import { SITE_NAME_KO, SITE_URL } from "./site";

export interface ContactSubmission {
  company: string;
  name: string;
  position?: string;
  email: string;
  phone?: string;
  interests: string[];
  timeline?: string;
  message: string;
  requestMediaKit?: boolean;
}

/**
 * Build the auto-reply body sent to the submitter. Mirrors CONTENT.md 8-1.
 * Currently Korean-only; English variant is added when locale is wired
 * through the API request.
 */
export function buildAutoReplyEmail(submission: ContactSubmission) {
  const interestsLine = submission.interests.join(", ");
  return {
    subject: `[${SITE_NAME_KO}] 문의가 접수되었습니다`,
    text: `안녕하세요, ${submission.name}님.

${SITE_NAME_KO}에 문의해주셔서 감사합니다.
문의 내용을 확인했으며, 담당자가 검토 후 1~3 영업일 이내 회신드리겠습니다.

[접수된 문의 내용]
- 회사명: ${submission.company}
- 관심 서비스: ${interestsLine}${submission.timeline ? `\n- 희망 진행 시기: ${submission.timeline}` : ""}

추가로 필요하신 사항이 있으시면 본 메일에 회신 부탁드립니다.

${SITE_NAME_KO} 드림
${SITE_URL}
`,
  };
}

/**
 * Build the internal notification email sent to the operations inbox. Mirrors
 * CONTENT.md 8-2.
 */
export function buildOperationsNotificationEmail(
  submission: ContactSubmission,
) {
  const interestsLine = submission.interests.join(", ");
  return {
    subject: `[제안 문의] ${submission.company} - ${interestsLine}`,
    text: `새 문의가 접수되었습니다.

[기업 정보]
- 회사명: ${submission.company}
- 이름: ${submission.name}${submission.position ? `\n- 직책: ${submission.position}` : ""}

[연락처]
- 이메일: ${submission.email}${submission.phone ? `\n- 전화: ${submission.phone}` : ""}

[문의 내용]
- 관심 서비스: ${interestsLine}${submission.timeline ? `\n- 희망 진행 시기: ${submission.timeline}` : ""}
- 미디어킷 함께 요청: ${submission.requestMediaKit ? "예" : "아니오"}

[메시지]
${submission.message}
`,
  };
}
