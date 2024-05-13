"use client";
import { useState } from "react";
import styles from "./DebateInfo.module.css";
import Post from "@/app/(NotMainPage)/_component/Post/Post";

const DebateInfo = ({ debateInfo }) => {
  return (
    <section className={styles.container}>
      <div className={styles.section4Left}>
        <div className={styles.titleDate}>2024년 5월 3주 주제</div>
        <div className={styles.debateTitle}>{debateInfo.title}</div>
        {/* <section className={styles.debateParagraph}>
          <p>{debateInfo.content}</p>
        </section> */}
      </div>
      <div className={styles.section4Right}>
        <div className={styles.section4RightSpan}>이번주 주제 뉴스로 보기↓</div>
        <section className={styles.postSection}>
          <Post article={debateInfo.article} />
        </section>
      </div>
    </section>
  );
};
export default DebateInfo;
