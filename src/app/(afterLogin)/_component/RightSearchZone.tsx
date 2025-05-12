"use client";

import { usePathname, useSearchParams } from "next/navigation";
import style from "./rightSearchZone.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import { useRouter } from "next/navigation";

export default function RightSearchZone() {
  const pathname = usePathname();
  const isExplore = pathname.includes("/explore");
  const isSearch = pathname.includes("/search");
  const searchParams = useSearchParams(); // 현재 검색 파라미터 전부 가져옴
  const router = useRouter();

  const onChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pf", "on"); // 기존 검색 파라미터에 pf on 추가
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  const onChangeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("pf"); // 기존 검색 파라미터에 pf 삭제
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  if (isExplore) return null;

  // 검색 페이지에서는 검색 필터 보여주기
  if (isSearch) {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.searchWrapper}>
      <SearchForm />
    </div>
  );
}
