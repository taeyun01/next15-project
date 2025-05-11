"use client";
import { TabContext } from "@/app/(afterLogin)/home/_component/TabProvider";
import style from "./tab.module.css";
import { useContext } from "react";

export default function Tab() {
  const { tab, setTab } = useContext(TabContext);

  const onClickRec = () => {
    console.log("추천 탭: ", tab);
    setTab("rec");
  };
  const onClickFol = () => {
    console.log("팔로우 중 탭: ", tab);
    setTab("fol");
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>홈</div>
      <div className={style.homeTab}>
        <div onClick={onClickRec}>
          추천
          <div className={style.tabIndicator} hidden={tab === "fol"}></div>
        </div>
        <div onClick={onClickFol}>
          팔로우 중
          <div className={style.tabIndicator} hidden={tab === "rec"}></div>
        </div>
      </div>
    </div>
  );
}
