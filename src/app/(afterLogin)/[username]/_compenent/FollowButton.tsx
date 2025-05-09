"use client";

import { useSession } from "next-auth/react";
import style from "../profile.module.css";

export default function FollowButton() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  return <button className={style.followButton}>팔로우</button>;
}
