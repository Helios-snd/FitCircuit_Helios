import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const publicRoutes = ["/api/clerk-webhook", "/", "/auth/login"]; // Webhook route must be public

  if (publicRoutes.some((route) => req.nextUrl.pathname.match(route))) {
    return NextResponse.next(); // Allow access
  }
  const authObject = await auth(); // ✅ Await the auth object
  if (!authObject || !authObject.userId) {
    return NextResponse.error();
  }
  // If the user is authenticated, you can return NextResponse.next()
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};