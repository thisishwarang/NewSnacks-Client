"use client";
import DebatebarSection from "@/app/_component/DebateBarSection/DebatebarSection";
import styles from "./VoteContainer.module.css";
import VoteSection from "./_component/VoteSection/VoteSection";
import { useState } from "react";

export default function VoteContainer({ debateInfo, getDebateDetailPage }) {
  return (
    <div className={styles.container}>
      <div className={styles.explain}>
        <span>팝콘을 드래그하여 투표하세요</span>
        <span>(기회는 한 번뿐!)</span>
      </div>
      <VoteSection
        debateInfo={debateInfo}
        getDebateDetailPage={getDebateDetailPage}
      />
      <section className={styles.debateResultSection}>
        <DebatebarSection
          agreeCount={debateInfo.agreeCount}
          disagreeCount={debateInfo.disagreeCount}
        />
      </section>
    </div>
  );
  //DebatebarSection이 사용되는곳 2개
  //둘다 해당 뉴스 id 가지고 있을거고 그럼 그걸로 투표결과만 따로 get하는 api 필요
}
