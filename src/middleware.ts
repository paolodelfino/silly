import { getToken } from "next-auth/jwt";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
  });
  if (!token) {
    return NextResponse.redirect(new URL(`/signin`, request.url));
  }
  return NextResponse.next(request);
}

export const config = { matcher: ["/mylist"] };
