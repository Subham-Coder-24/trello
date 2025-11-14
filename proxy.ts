import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)'
])
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
  const { userId, orgId,redirectToSignIn } = await auth();

  if (userId && isPublicRoute(req)) {
    let path = "/select-org";
    if (orgId) {
      path = `/organization/${orgId}`;
    }
    const orgSelectionUrl = new URL(path, req.url);
    return NextResponse.redirect(orgSelectionUrl);
  }

  // 2️⃣ If not signed in and accessing protected route
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }

  // 3️⃣ If signed in but no org selected, force /select-org
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }

  // Default — continue
  return NextResponse.next();
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}