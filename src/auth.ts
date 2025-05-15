import NextAuth, { CredentialsSignin } from "next-auth";
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
          const credentialsSignin = new CredentialsSignin();

          // 404: 가입되지 않은 유저가 로그인을 시도할 때
          if (authResponse.status === 404) {
            credentialsSignin.code = "no_user";
          } else if (authResponse.status === 401) {
            // 401: 비밀번호가 틀렸을 때
            credentialsSignin.code = "wrong_password";
          }

          // 로그인 실패시 에러코드 메세지를 던져줌
          throw credentialsSignin;
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
      },
    }),
  ],
});
