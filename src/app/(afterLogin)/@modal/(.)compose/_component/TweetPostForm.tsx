"use client";

import style from "../tweet/modal.module.css";
import Image from "next/image";
import { useRef, useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";

export default function TweetPostForm() {
  const { data: me } = useSession();
  const [content, setContent] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {};
  const onClickButton = () => {};
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form className={style.modalForm} onSubmit={onSubmit}>
      <div className={style.modalBody}>
        <div className={style.postUserSection}>
          <div className={style.postUserImage}>
            <Image
              src={me?.user?.image as string}
              alt={me?.user?.email as string}
              width={40}
              height={40}
              unoptimized
            />
          </div>
        </div>
        <div className={style.inputDiv}>
          <textarea
            className={style.input}
            placeholder="무슨 일이 일어나고 있나요?"
            value={content}
            onChange={onChangeContent}
          />
        </div>
      </div>
      <div className={style.modalFooter}>
        <div className={style.modalDivider} />
        <div className={style.footerButtons}>
          <div className={style.footerButtonLeft}>
            <input
              type="file"
              name="imageFiles"
              multiple
              hidden
              ref={imageRef}
            />
            <button
              className={style.uploadButton}
              type="button"
              onClick={onClickButton}
            >
              <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                </g>
              </svg>
            </button>
          </div>
          <button className={style.actionButton} disabled={!content}>
            게시하기
          </button>
        </div>
      </div>
    </form>
  );
}
