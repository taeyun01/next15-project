"use client";

import Image from "next/image";
import style from "./logoutButton.module.css";

export default function LogoutButton() {
  // 임시정보
  const me = {
    id: "taeyun",
    nickname: "태윤",
    image: "/tlogo.png",
  };

  const onLogout = () => {};

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <Image src={me.image} alt={me.id} width={32} height={42} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
