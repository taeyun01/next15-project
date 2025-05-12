import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import style from "./photoModal.module.css";
import PhotoModalCloseButton from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import ImageZone from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/ImageZone";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PhotoModal({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["posts", id],
      queryFn: getSinglePost,
    }),
    queryClient.prefetchQuery({
      queryKey: ["posts", id, "comments"],
      queryFn: getComments,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
