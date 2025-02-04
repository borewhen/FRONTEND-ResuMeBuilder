import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
    const token = req.cookies.get("access_token")?.value;

    if(!token){
        return NextResponse.redirect(new URL("/login", req.url).toString());
    }
    
    const role = req
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|login$|register$|reset$).*)"],
};
  