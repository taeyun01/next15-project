"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";

const signup = async (
  // eslint-disable-next-line
  prevState: any,
  formData: FormData
) => {
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }
  formData.set("nickname", formData.get("name") as string);

  let shouldRedirect = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include", // 쿠키전달 (지금 세션을 사용하기 때문에 세션쿠키가 브라우저에 등록이 돼야되므로 등록)
      }
    );

    console.log("status: ", response.status);

    // 이미 회원가입 한 아이디인 경우
    if (response.status === 403) {
      return { message: "user_exists" };
    } else if (response.status === 400) {
      return {
        message: (await response.json()).data[0],
        // 에러가 뜨면 입력했던 폼 내용들이 다 사라지므로 다시 전달해줘야함
        id: formData.get("id"),
        nickname: formData.get("nickname"),
        password: formData.get("password"),
        image: formData.get("image"), // 이미지는 다시 전달해줘도 어쩔 수 없이 다시 업로드 해야함
      };
    }

    // const user = await response.json();
    // console.log("user: ", user);

    // 회원가입 후 로그인까지
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });

    shouldRedirect = true;
  } catch (err) {
    console.error(err);
    return { message: null };
  }

  // 회원가입 성공한 경우 리다이렉트
  if (shouldRedirect) {
    redirect("/home"); // !redirect쓸 때 주의점 try catch문 안에서 쓰면 안됨. 이렇게 분기처리로 사용
  }
};

export default signup;
