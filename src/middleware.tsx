import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
    const token = req.cookies.get("access_token")?.value;
    
    // Check if this is the root path (landing page)
    const isRootPath = req.nextUrl.pathname === "/";
    
    // Don't apply authentication check to the landing page
    if (isRootPath) {
        return NextResponse.next();
    }

    if(!token){
        return NextResponse.redirect(new URL("/login", req.url).toString());
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|login$|register$|reset$).*)"],
};
  