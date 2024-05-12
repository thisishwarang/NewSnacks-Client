"use client";
import { useEffect, useState } from "react";
import CommentContainer from "../CommentContainer/CommentContainer";
import DebateInfo from "../DebateInfo/DebateInfo";
import VoteContainer from "../VoteContainer/VoteContainer";
import styles from "./DebateDetailContainer.module.css";
import axios from "axios";

export default function DebateDetailContainer({ params }) {
  const [debateInfo, setDebateInfo] = useState();
  useEffect(() => {
    getDebateDetailPage();
  }, []);

  const getDebateDetailPage = async () => {
    console.log("getDebate 실행");
    try {
      const response = await axios.get(
        `https://dev.jaeyun.shop/v1/debates/${params.titleId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const {
        agreeCount,
        disagreeCount,
        content,
        debateId,
        title,
        vote,
        articleId,
        articleCreatedAt,
        articleTitle,
        ...rest
      } = response.data.data;
      setDebateInfo({
        agreeCount,
        disagreeCount,
        content,
        debateId,
        title,
        vote,
        article: {
          id: articleId,
          createdAt: articleCreatedAt,
          title: articleTitle,
          ...rest,
        },
      });
    } catch (error) {
      console.log("팝콘토론 상세페이지 오류", error);
    }
  };
  console.log(debateInfo);
  if (!debateInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <DebateInfo debateInfo={debateInfo} />
      <VoteContainer
        debateInfo={debateInfo}
        // onVote={() => getDebateDetailPage()}
        getDebateDetailPage={getDebateDetailPage}
      />
      <CommentContainer
        debateInfo={debateInfo}
        getDebateDetailPage={getDebateDetailPage}
      />
    </div>
  );
}
