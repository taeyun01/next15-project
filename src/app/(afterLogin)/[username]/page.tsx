import style from "./profile.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UserPosts from "@/app/(afterLogin)/[username]/_compenent/UserPosts";
import UserInfo from "@/app/(afterLogin)/[username]/_compenent/UserInfo";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";

type Props = {
  params: Promise<{ username: string }>;
};

//* 어떤 기준으로 서버사이드 렌더링을 하냐??: 검색페이지에 노출이 필요한 페이지를 서버사이드 렌더링을 해주면 됨
export default async function Profile({ params }: Props) {
  const { username } = await params;
  const queryClient = new QueryClient();
  // console.log("username: ", username);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["users", username],
      queryFn: getUser,
    }),
    queryClient.prefetchQuery({
      queryKey: ["posts", "users", username],
      queryFn: getUserPosts,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
