type Props = {
  pageParam?: number;
};

export const getPostRecommends = async ({ pageParam }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      // cache: "no-store", // force-cache는 캐시 활성화, 기본값은 no-store 캐시 비활성화
      // cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
