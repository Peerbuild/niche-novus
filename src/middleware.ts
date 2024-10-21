import { auth } from "@/lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/admin/login") {
    const newUrl = new URL("/admin/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && ["/admin", "/admin/login"].includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/admin/about", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
