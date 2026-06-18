import getJwtExpiry from "@/utils/getJwtExpiry";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const newHeaders = new Headers(req.headers);

  if (accessToken) {
    const expDate = getJwtExpiry(accessToken);
    const isValid = expDate && expDate * 1000 > Date.now();
    if (isValid) return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const refreshRes = await fetch("http://localhost:3000/auth/refresh-token", {
    method: "POST",
    headers: {
      cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!refreshRes.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  refreshRes.headers.getSetCookie().forEach((cookie) => {
    const accessTokenMatch = cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
    if (accessTokenMatch) {
      newHeaders.set("x-access-token", accessTokenMatch[1]);
    }
  });

  const response = NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });

  refreshRes.headers.getSetCookie().forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}

export const config = {
  matcher: ["/((?!login|register|_next/static|_next/image|favicon.ico|$).*)"],
};
