import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get hostname (e.g. "vanturadigital.co.nz" or "staging.vercel.app")
    const host = request.headers.get("host") || "";

    // PRODUCTION DOMAINS
    // Add any other production domains here (e.g. www.)
    const validDomains = ["vanturadigital.co.nz", "www.vanturadigital.co.nz"];

    // If the current host is NOT in our list of valid production domains...
    if (!validDomains.includes(host)) {
        // ...tell search engines NOT to index this version of the site.
        response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }

    return response;
}

export const config = {
    // Run on all routes
    matcher: "/:path*",
};
