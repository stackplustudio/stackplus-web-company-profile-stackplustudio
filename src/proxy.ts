import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "sp_admin_session";

async function isValid(token: string | undefined) {
  if (!token || !process.env.AUTH_SECRET) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET), { algorithms: ["HS256"] });
    return true;
  } catch { return false; }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = await isValid(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = pathname === "/admin/login";

  if (pathname.startsWith("/api/admin") && !authed)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isLogin && pathname.startsWith("/admin") && !authed)
    return NextResponse.redirect(new URL("/admin/login", request.url));
  if (isLogin && authed)
    return NextResponse.redirect(new URL("/admin", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };