"use client";

import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getSearchResult } from "@/app/(afterLogin)/search/_lib/getSearchResult";
import { useQuery } from "@tanstack/react-query";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};
export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
    IPost[],
    // eslint-disable-next-line
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams], //* 1. 쿼리키는
    queryFn: getSearchResult, //* 2. 쿼리함수로 전달된다.
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
