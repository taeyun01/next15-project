"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

export default function FollowingPosts() {
  const { data } = useSuspenseQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  //* Suspense로 감싸져 있기때문에 조건문 처리를 안해줘도됨
  //* useQuery로 데이터를 불러오는 경우 로딩 처리를 해야되지만 useSuspenseQuery를 사용하면 조건문 처리를 안해줘도됨
  // if (isPending) {
  //   return <Loading />;
  // }

  //* useQuery에서 isError를 받아 처리해도 되지만 useSuspenseQuery에서는 처리 안해도됨
  // if (isError) {
  //   return "에러 발생";
  // }

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
