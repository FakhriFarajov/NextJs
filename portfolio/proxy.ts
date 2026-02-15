import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authPages = [
  "/auth/sign-in",
];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthPage = authPages.some((page) => pathname.startsWith(page));

  const session = await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  if (isAuthPage && session) { //Email sign in checking implementation REMINDER
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|public|.*\\..*).*)'],
}