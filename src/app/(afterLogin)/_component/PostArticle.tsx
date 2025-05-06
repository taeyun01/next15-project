"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    // eslint-disable-next-line
    Images: any[]; // TODO: 추후 타입 수정
  };
};

//* 온클릭하나로 서버컴포넌트를 다 대체할 수 없으니 온클릭 컴포넌트를 만들어서 사용
export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    // onClickCapture: 클릭 이벤트랑 a태그랑 겹쳐서 충돌나거나 할 때 유용
    <article onClickCapture={onClick} className={style.post}>
      {children}
    </article>
  );
}
