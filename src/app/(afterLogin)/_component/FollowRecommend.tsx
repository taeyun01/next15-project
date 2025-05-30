"use client";

import Image from "next/image";
import style from "./followRecommend.module.css";
import { User } from "@/model/User";

type Props = {
  user: User;
};

export default function FollowRecommend({ user }: Props) {
  const onFollow = () => {};

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <Image
            src={user.image}
            alt={user.id}
            width={48}
            height={48}
            unoptimized
          />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
}
