import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/i/flow/login");
  }
}

// 로그인을 안했을 때 해당 경로에 접근하면 로그인 페이지로 리다이렉트
export const config = {
  matcher: [
    "/compose/tweet",
    "/home",
    "/explore",
    "/messages",
    "/search",
    "/:username",
  ],
};
