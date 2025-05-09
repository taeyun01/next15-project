"use client";

import style from "./trendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TrendSection() {
  //* useSelectedLayoutSegment()훅 말고 usePathname()훅 알아보기 (훅은 클라이언트 컴포넌트에서만 사용)
  const pathname = usePathname(); // /explore?q= 이렇게 있다고 치면 /부터 ?앞까지 pathname임 즉, /explore가 pathname
  const isExplore = pathname.includes("/explore");
  const { data: session } = useSession();

  if (isExplore) return null;

  if (!session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.noTrend}>
          <p>로그인 후 트렌드를 확인해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  );
}
