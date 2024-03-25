"use client";
import { useState } from "react";
import styles from "./DebateInfo.module.css";
import Post from "@/app/(NotMainPage)/_component/Post/Post";

export default function DebateInfo({ debateInfo }) {
  const [fakeArticle, setFakeArticle] = useState({
    id: 1,
    title: "이스라엘-가자 전쟁: 레바논 국경에서 긴장 고조",
    imageUrl: "/전쟁사진.png",
    createdAt: "2024/01/04",
    category: "art",
    createdAt: "2024/01/04",
  });
  return (
    <section className={styles.container}>
      <div className={styles.section4Left}>
        <div className={styles.titleDate}>2024년 2월 4주 주제</div>
        <div className={styles.debateTitle}>{debateInfo.title}</div>
        <section className={styles.debateParagraph}>
          <p>{debateInfo.content}</p>
        </section>
      </div>
      <div className={styles.section4Right}>
        <div className={styles.section4RightSpan}>이번주 주제 뉴스로 보기↓</div>
        <section className={styles.postSection}>
          <Post article={debateInfo.article} />
        </section>
      </div>
    </section>
  );
}
