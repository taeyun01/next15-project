import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();

  // TODO: 추후 수정 ["posts", "followings"]은 프리팽칭 x
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // cursor값 초기화
  });

  // 데이터를 불러오고 나면 dehydrate 함수를 통해 데이터를 준비
  const dehydratedState = dehydrate(queryClient); // Hydrate는 서버에서온 데이터를 클라이언트에서 그대로 형식맞춰서 물려받음 즉, 서버에서 미리 데이터를 준비
  // throw new Error("으하하하하"); //* 만약 서버 컴포넌트에서 에러가 발새앟면 error.tsx파일을 호출함
  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
