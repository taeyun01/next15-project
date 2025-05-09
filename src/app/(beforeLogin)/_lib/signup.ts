"use server";

import { redirect } from "next/navigation";

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

  let shouldRedirect = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );

    console.log(response.status);

    // 이미 회원가입 한 아이디인 경우
    if (response.status === 403) {
      return { message: "user_exists" };
    }

    console.log(response.json());
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
