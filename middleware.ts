import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicpath = path === "/login" || path === "/";
  const isAdminPath = path == "/admin" || path === "/admin/employeelist";
  const isEmployeePath = path == "/employee" || path === "/employee/profile";

  const token = request.cookies.get("token")?.value || "";
  const decodedToken = jwt.decode(token) as JwtPayload; // Casting to JwtPayload

  const isAdmin = decodedToken?.isAdmin;

  if (isPublicpath && token) {
    if (isAdmin === true && !isAdminPath) {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else if (isAdmin === false && !isEmployeePath) {
      return NextResponse.redirect(new URL("/employee", request.url));
    }
  }

  if (!isPublicpath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/admin",
    "/admin/employeelist",
    "/admin/changepassword",
    "/employee",
    "/employee/profile",
    "/employee/changepassword",
  ],
};
