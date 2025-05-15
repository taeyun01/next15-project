"use client";

import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import style from "./login.module.css";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setDisabled(true);
    try {
      const result = await signIn("credentials", {
        username: id,
        password: password,
        redirect: false, //* 리다이렉트를 하게되면 서버쪽에서 하게됨
      }); // id, password로그인

      console.log("result", result);

      if (result?.status === 200) {
        setDisabled(false);
      }

      if (result?.code === "no_user") {
        return setMessage("가입되지 않은 유저입니다.");
      }

      if (result?.code === "wrong_password") {
        return setMessage("비밀번호가 일치하지 않습니다.");
      }

      router.replace("/home"); //* 클라이언트 컴포넌트에서는 라우터로 리다이렉트 해줘야함
    } catch (error) {
      console.log(error);
      setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (session?.user) {
      router.replace("/home");
    }
  }, [session, router]);

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <BackButton />
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={style.input}
                value={id}
                onChange={onChangeId}
                type="text"
                placeholder=""
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder=""
              />
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button
              className={style.actionButton}
              disabled={(!id && !password) || disabled}
            >
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
