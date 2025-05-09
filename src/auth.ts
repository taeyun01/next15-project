import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login", // 로그인 페이지
    newUser: "/i/flow/signup", // 회원가입 페이지
  },
  providers: [
    CredentialsProvider({
      // 로그인을 수행하면 authorize()가 호출됨. credentials안에는 로그인 화면에서 입력한 값이 들어옴 (username과 password)
      async authorize(credentials) {
        try {
          const authResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // NextAuth에서는 username과 password가 고정되어 들어오는데 우리 플젝에선 id와 password를 사용해서 일치하게 바꿔줌
                id: credentials.username,
                password: credentials.password,
              }),
            }
          );

          // 로그인 실패 시
          if (!authResponse.ok) {
            return null;
          }

          // 로그인 성공하면 id, userId, nickname, image를 받아옴
          const user = await authResponse.json();
          console.log("user", user);
          return {
            email: user.id,
            name: user.nickname,
            image: user.image,
            ...user,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});
