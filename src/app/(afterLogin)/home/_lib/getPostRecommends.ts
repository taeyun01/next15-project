const getPostRecommends = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      cache: "no-store", // force-cache는 캐시 활성화, 기본값은 no-store 캐시 비활성화
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export default getPostRecommends;
