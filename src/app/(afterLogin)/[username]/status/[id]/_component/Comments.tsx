"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  id: string;
};

export default function Comments({ id }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);
  const { data, error } = useQuery<
    IPost[],
    object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
    enabled: !!post, // 원본 글이 있을 때만 댓글 불러오기
  });

  if (error) {
    return <div>댓글을 불러오는데 실패했습니다.</div>;
  }

  if (post) {
    return data?.map((post) => <Post post={post} key={post.postId} />);
  }
  return null;
}
