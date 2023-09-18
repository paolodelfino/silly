import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (
    !request.cookies.get("next-auth.session-token")?.value &&
    !request.cookies.get("__Secure-next-auth.session-token")?.value
  ) {
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${request.url}`, request.url),
    );
  }
  return NextResponse.next();
}

export const config = { matcher: ["/mylist/:path*"] };
