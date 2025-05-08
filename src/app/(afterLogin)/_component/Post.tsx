import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import Image from "next/image";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
import PostImages from "@/app/(afterLogin)/_component/PostImages";
// import { faker } from "@faker-js/faker";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
};

export default function Post({ noImage }: Props) {
  const target = {
    postId: 1,
    User: {
      id: "elonmusk",
      nickname: "Elon Musk",
      image: "/logo.jpg",
    },
    content: "안녕하세요 일론 머스크 입니다! 반갑습니다!",
    createdAt: new Date(),
    // eslint-disable-next-line
    Images: [] as any[], // TODO: 추후 타입 정의 필요
  };

  // 50% 확률로 이미지 추가
  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      {
        imageId: 1,
        // link: faker.image.urlLoremFlickr(),
        link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0500/ko/20240731/0016/P001759776.jpg/dims/resize/1280",
      },
      {
        imageId: 2,
        // link: faker.image.urlLoremFlickr(),
        link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0500/ko/20240731/0016/P001759776.jpg/dims/resize/1280",
      },
      {
        imageId: 3,
        // link: faker.image.urlLoremFlickr(),
        link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0500/ko/20240731/0016/P001759776.jpg/dims/resize/1280",
      }
      // {
      //   imageId: 4,
      //   // link: faker.image.urlLoremFlickr(),
      //   link: "https://image.tving.com/ntgs/contents/CTC/caip/CAIP0500/ko/20240731/0016/P001759776.jpg/dims/resize/1280",
      // }
    );
  }

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <Image
              src={target.User.image}
              alt={target.User.nickname}
              width={40}
              height={40}
            />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div>
            <PostImages post={target} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
