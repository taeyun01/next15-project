import style from "./home.module.css";
import Tap from "./_component/Tab";
import PostForm from "./_component/PostForm";
import Post from "../_component/Post";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const getPostRecommend = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/postRecommend`,
    {
      next: {
        tags: ["posts", "recommend"],
      },
      cache: "force-cache", // force-cache는 캐시 활성화, 기본값은 no-store 캐시 비활성화
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommend"],
    queryFn: getPostRecommend,
  }); // 데이터를 불러옴

  // 데이터를 불러오고 나면 dehydrate 함수를 통해 데이터를 준비
  const dehydratedState = dehydrate(queryClient); // Hydrate는 서버에서온 데이터를 클라이언트에서 그대로 형식맞춰서 물려받음 즉, 서버에서 미리 데이터를 준비

  // 데이터를 가져오는 방법
  const data = queryClient.getQueryData(["posts", "recommend"]);
  console.log(data);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tap />
          <PostForm />
          <Post />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
};

export default HomePage;
