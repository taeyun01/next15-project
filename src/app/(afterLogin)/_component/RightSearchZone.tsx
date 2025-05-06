"use client";

import { usePathname } from "next/navigation";
import style from "./rightSearchZone.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";

export default function RightSearchZone() {
  const pathname = usePathname();
  const isExplore = pathname.includes("/explore");
  const isSearch = pathname.includes("/search");

  const onChangeFollow = () => {};
  const onChangeAll = () => {};

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
