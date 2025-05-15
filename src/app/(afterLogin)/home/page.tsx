import style from "./home.module.css";
import Tap from "./_component/Tab";
import PostForm from "./_component/PostForm";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import { Suspense } from "react";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import Loading from "@/app/(afterLogin)/home/loading";
// import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";

const HomePage = async () => {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tap />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
};

export default HomePage;
