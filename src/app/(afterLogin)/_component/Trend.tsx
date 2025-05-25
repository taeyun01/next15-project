import Link from "next/link";
import style from "./trend.module.css";
import { Hashtag } from "@/model/Hashtag";

type Props = {
  trend: Hashtag;
};

export default function Trend({ trend }: Props) {
  return (
    // 주소창에 #이 들어가면 문제가됨. 그 뒤로는 서버에 전송이 안되어 encodeURIComponent()로 인코딩. (# -> %23으로 바꾸는 함수)
    <Link
      href={`/search?q=${encodeURIComponent(trend.title)}`}
      className={style.container}
    >
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
