import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "./auth";

/**
 * Server-side guard for admin pages. Redirects to /admin/login when no session
 * is present, otherwise returns the session.
 */
export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  return session;
}

export interface ActionResult {
  ok: boolean;
  message: string;
}

export const ACTION_INIT: ActionResult = { ok: false, message: "" };
