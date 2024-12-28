import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    // Retrieve the token from the request
    const token = await getToken({ req, secret: 'secret' });

    const { pathname } = req.nextUrl;

    // If the user is logged in or accessing public routes, allow the request
    if (token || pathname.startsWith("/api/auth") || pathname === "/login") {
        return NextResponse.next(); // Allow the request to proceed
    }

    // Redirect the user to the login page if they are not authenticated
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url); // Pass the original URL for redirect after login
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/dashboard", "/pricing"], // Protect dashboard and profile routes
};

