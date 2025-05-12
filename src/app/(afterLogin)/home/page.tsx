import style from "./home.module.css";
import Tap from "./_component/Tab";
import PostForm from "./_component/PostForm";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getPostRecommends from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";

const HomePage = async () => {
  const queryClient = new QueryClient();

  // TODO: 추후 수정 ["posts", "followings"]은 프리팽칭 x
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["posts", "recommends"],
      queryFn: getPostRecommends,
      initialPageParam: 0, // cursor값 초기화
    }),
    queryClient.prefetchQuery({
      queryKey: ["posts", "followings"],
      queryFn: getFollowingPosts,
    }),
  ]);

  // 데이터를 불러오고 나면 dehydrate 함수를 통해 데이터를 준비
  const dehydratedState = dehydrate(queryClient); // Hydrate는 서버에서온 데이터를 클라이언트에서 그대로 형식맞춰서 물려받음 즉, 서버에서 미리 데이터를 준비

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tap />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
};

export default HomePage;
