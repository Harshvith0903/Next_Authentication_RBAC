import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Pages requiring authentication and roles
const roleProtectedRoutes: Record<string, string[]> = {
  "/dashboard/admin": ["ADMIN"],
  "/dashboard/upload": ["UPLOAD_TEAM"],
  "/dashboard/draftsman": ["DRAFTSMAN"],
  "/dashboard/site-incharge": ["SITE_INCHARGE"],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If user is not authenticated, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const userRole = token.role as string;
  const requestedPath = req.nextUrl.pathname;

  // Check if the page requires role-based access
  for (const [route, allowedRoles] of Object.entries(roleProtectedRoutes)) {
    if (requestedPath.startsWith(route) && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirect unauthorized users
    }
  }

  return NextResponse.next(); // Allow access if authorized
}

// Apply middleware to all protected routes
export const config = {
  matcher: ["/dashboard/:path*"], // Protect all dashboard pages
};
