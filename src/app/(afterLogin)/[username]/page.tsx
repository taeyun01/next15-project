import style from "./profile.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Image from "next/image";
import FollowButton from "@/app/(afterLogin)/[username]/_compenent/FollowButton";

export default async function Profile() {
  const user = {
    id: "taeyun",
    nickname: "유태윤",
    image: "/tlogo.png",
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <Image src={user.image} alt={user.id} width={134} height={134} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <FollowButton />
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
