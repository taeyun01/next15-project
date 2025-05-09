import Main from "./_component/Main";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth(); // 서버컴퍼넌트 에서는 useSession 대신 auth()로 사용자 정보 가져오기

  if (session?.user) {
    return redirect("/home");
  }

  return <Main />;
}
