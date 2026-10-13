import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "sp_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 jam

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET belum diset atau kurang dari 32 karakter.");
  return new TextEncoder().encode(secret);
}

export type AdminSession = { adminId: string; email: string };

export async function createSessionToken(session: AdminSession) {
  return new SignJWT({ email: session.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.adminId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string | undefined): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    if (!payload.sub || typeof payload.email !== "string") return null;
    return { adminId: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

export async function setSessionCookie(session: AdminSession) {
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Panggil di awal SETIAP Server Action / Route Handler admin. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}

// Hash dummy supaya waktu respons sama baik email ada maupun tidak.
let dummyHash: string | undefined;
const getDummyHash = () => (dummyHash ??= bcrypt.hashSync("stackplus-dummy-password", 12));

export async function verifyAdminCredentials(email: string, password: string) {
  const user = await db.adminUser.findUnique({ where: { email: email.toLowerCase() } });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? getDummyHash());
  if (!user || !ok) return null;
  return { adminId: user.id, email: user.email } satisfies AdminSession;
}

// Rate limit login (in-memory per instance; cukup menahan brute force dasar)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) return { allowed: true };
  return { allowed: entry.count < MAX_ATTEMPTS, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
}
export function recordFailedLogin(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  else entry.count += 1;
}
export function clearFailedLogins(key: string) { attempts.delete(key); }