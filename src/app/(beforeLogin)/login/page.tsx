"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      return router.replace("/home");
    }

    router.replace("/i/flow/login");
  }, [router, session]);

  return <Main />;
}

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login로 이동 했을 때
// 뒤로가기 누르면 /login(로그인) 페이지로 돌아옴

// router.replace
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login로 이동 했을 때
// replace는 이전 히스토리를 지워줘서 뒤로가기 누르면 localhost:3000로 바로 돌아옴
