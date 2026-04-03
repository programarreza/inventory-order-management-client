import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface DecodedAccessToken {
  role?: string;
  exp?: number;
}

// Role-based route access configuration
const roleBasedRoutes: Record<string, string[]> = {
  admin: [
    "/dashboard",
    "/dashboard/products",
    "/dashboard/categories",
    "/dashboard/orders",
    "/dashboard/restocks",
  ],
  manager: [
    "/dashboard",
    "/dashboard/products",
    "/dashboard/categories",
    "/dashboard/orders",
    "/dashboard/restocks",
  ],
  user: ["/dashboard/user-orders"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Try to get token from both cookie and header
  const tokenFromCookie = req.cookies.get("accessToken")?.value;
  const tokenFromHeader = req.headers.get("x-access-token");
  const accessToken = tokenFromCookie || tokenFromHeader;

  // Store current path-url in a special header
  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  // Handle dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Redirect to login if no access token
    if (!accessToken) {
      const loginUrl = new URL("/login", req.url);

      loginUrl.searchParams.set("from", pathname.trim());

      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = jwtDecode<DecodedAccessToken>(accessToken);
      const userRole = decoded.role?.toLowerCase();

      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        return NextResponse.redirect(
          new URL("/login?session=expired", req.url),
        );
      }

      // Check if user has access to the requested route
      if (userRole && roleBasedRoutes[userRole]) {
        const hasAccess = roleBasedRoutes[userRole].includes(pathname);

        if (!hasAccess) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } else {
        // No role or invalid role
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(
        new URL("/login?error=invalid_token", req.url),
      );
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
