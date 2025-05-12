import style from "./modal.module.css";
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import TweetPostForm from "@/app/(afterLogin)/@modal/(.)compose/_component/TweetPostForm";

export default function ComposeTweetModal() {
  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <BackButton />
        <TweetPostForm />
      </div>
    </div>
  );
}
