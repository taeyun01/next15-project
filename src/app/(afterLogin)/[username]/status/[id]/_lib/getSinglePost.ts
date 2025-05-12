export const getSinglePost = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  // eslint-disable-next-line
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    {
      next: {
        tags: ["posts", id],
      },
      cache: "force-cache", // 캐시 데이터를 사용하도록 설정
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
