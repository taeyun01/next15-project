import style from "./home.module.css";
import Tap from "./_component/Tab";
import PostForm from "./_component/PostForm";
import Post from "../_component/Post";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";

const HomePage = () => {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tap />
        <PostForm />
        {/* <Post /> */}
      </TabProvider>
    </main>
  );
};

export default HomePage;
