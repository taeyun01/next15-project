"use client";

import { useQuery } from "@tanstack/react-query";
import getPostRecommends from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

const PostRecommends = () => {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // 60초 동안 캐시 유지. (1분이 지나고 새로고침을 하면 서버로 부터 데이터를 새로 가져옴) 컨텐츠 특성에 따라 조정하면됨
    // staleTime: Infinity, // 한번 데이터를 가져오면 캐시된 데이터만 가져옴. 새로고침 되도 (데이터가 변경되지 않는 경우 사용)
    gcTime: 300 * 1000, // 기본값은 5분으로 설정 되어있음. (서버에서 받은 데이터들이 메모리에 캐시 되어 있을건데 데이터를이 너무 많아지면 메모리가 터져서 웹사이트가 멈출 수 있음.)
    // Inactive 상태일 때, gcTime이 돌아가기 시작함. 즉, data를 사용하지 않는 화면에 이동을 했을때 gcTime이 돌아가고 5분뒤에 메모리에서 정리가됨 (inactive란 지금 보는 화면에서 queryKey: ["posts", "recommends"] 이 쿼리를 사용하지 않는다면 inactive상태가 됨. 즉 해당 쿼리를 사용하지 않는 다른 화면으로 넘어갔을 때. 그냥 이 쿼리를 쓰고 있냐 안쓰고 있냐 상태임)
    // 만약 5분 사이에 돌아오면 캐시되어있던 데이터를 바로 보여주지만, 5분이 지나면 메모리에서 정리가 되면 캐시가 날아가기 때문에 데이터를 새로 불러옴
    //* staleTime은 항상 gcTime보다 짧아야한다.
  });

  console.log(data);

  return data?.map((post) => <Post key={post.postId} post={post} />);
};

export default PostRecommends;
