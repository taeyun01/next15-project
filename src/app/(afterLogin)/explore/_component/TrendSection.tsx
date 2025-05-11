"use client";

import Trend from "@/app/(afterLogin)/_component/Trend";
import { useQuery } from "@tanstack/react-query";
import { Hashtag } from "@/model/Hashtag";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"], // 키 값이 같으면 둘중하나만 불러와짐
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  console.log("TrendSection: ", data);

  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
