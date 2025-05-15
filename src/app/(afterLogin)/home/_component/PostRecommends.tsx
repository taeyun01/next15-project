"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PostRecommends = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    object,
    InfiniteData<IPost[]>, // 인피니티 쿼리의 데이터 타입
    [_1: string, _2: string], // queryKey의 파라미터 타입 자리
    number // initialPageParam, getNextPageParam의 타입 자리
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends, //* 다음 페이지를 불러오는 함수
    staleTime: 60 * 1000, // 60초 동안 캐시 유지. (1분이 지나고 새로고침을 하면 서버로 부터 데이터를 새로 가져옴) 컨텐츠 특성에 따라 조정하면됨
    // staleTime: Infinity, // 한번 데이터를 가져오면 캐시된 데이터만 가져옴. 새로고침 되도 (데이터가 변경되지 않는 경우 사용)
    gcTime: 300 * 1000, // 기본값은 5분으로 설정 되어있음. (서버에서 받은 데이터들이 메모리에 캐시 되어 있을건데 데이터를이 너무 많아지면 메모리가 터져서 웹사이트가 멈출 수 있음.)
    // Inactive 상태일 때, gcTime이 돌아가기 시작함. 즉, data를 사용하지 않는 화면에 이동을 했을때 gcTime이 돌아가고 5분뒤에 메모리에서 정리가됨 (inactive란 지금 보는 화면에서 queryKey: ["posts", "recommends"] 이 쿼리를 사용하지 않는다면 inactive상태가 됨. 즉 해당 쿼리를 사용하지 않는 다른 화면으로 넘어갔을 때. 그냥 이 쿼리를 쓰고 있냐 안쓰고 있냐 상태임)
    // 만약 5분 사이에 돌아오면 캐시되어있던 데이터를 바로 보여주지만, 5분이 지나면 메모리에서 정리가 되면 캐시가 날아가기 때문에 데이터를 새로 불러옴
    //* staleTime은 항상 gcTime보다 짧아야한다.
    initialPageParam: 0, // 처음에 [1, 2, 3, 4, 5]개씩 가져올거임. 그럼 1~5는 last페이지임 [[6, 7, 8, 9, 10], [11, 12, 13, 14, 15]] ... 인피니티 쿼리는 이런식으로 값이 들어있음 (2차원 배열로)
    getNextPageParam: (lastPage) => {
      return lastPage.at(-1)?.postId; // last페이지의 마지막 게시글의 postId를 가져옴
    },
  });

  const { ref, inView } = useInView({
    threshold: 0, // div가 보이자마자 호출하도록 0 설정
    delay: 0, // div가 보인후 몇초 후에 호출할건지
  });

  console.log(data);

  // 2차원 배열을 1차원 배열로 펼치기
  const posts = data?.pages.flatMap((page) => page);

  useEffect(() => {
    // 화면이 안보이면 inView가 false가 되고 화면이 보이면 inView가 true가 되어 useEffect가 호출됨
    if (inView) {
      // 데이터를 불러오는 중이지 않고 다음 페이지가 있을때만 다음 페이지를 불러옴 (데이터 이미 가져오고 있는데 또 가져오면 안되니까. 그 데이터 가져오고 난 후 다음 데이터를 가져 와야함)
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  return (
    <>
      {posts?.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
};

export default PostRecommends;
