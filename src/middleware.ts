import { getToken } from "next-auth/jwt";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (!request.cookies.get("next-auth.session-token")) {
    return NextResponse.redirect(new URL(`/signin`, request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/mylist"] };
