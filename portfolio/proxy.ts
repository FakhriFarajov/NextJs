import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import  createIntlMiddleware  from "next-intl/middleware";


const authPages = ["/auth/signin"]
const protectedPages = ["/dashboard"]

const intlMiddleware = createIntlMiddleware({
    locales: ["en", "ru", "az"],
    defaultLocale: "en",
    localePrefix: "always",
})

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl; //localhost:3000/en/about

    const isAuthPage = authPages.some(page => pathname.includes(page));
    const isProtectedPage = protectedPages.some(page => pathname.includes(page));

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    // If user is logged in but not authorized, redirect to home (only for protected pages)
    if (session?.email && session.email !== "azer.kazimov@yahoo.com" && isProtectedPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // If user is logged in and tries to access auth pages, redirect to dashboard
    if (session?.email && isAuthPage){
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user is not logged in and tries to access protected pages, redirect to signin
    if (!session?.email && isProtectedPage){
        return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/((?!api|_next|public|.*\\..*).*)'],
}