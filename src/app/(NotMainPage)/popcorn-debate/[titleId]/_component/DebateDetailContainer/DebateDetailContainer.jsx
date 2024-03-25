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
    try {
      const response = await axios.get(
        `https://dev.jaeyun.shop/v1/debates/${params.titleId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEwLCJyb2wiOiJVU0VSIiwiaWF0IjoxNzA1NTk4MjA3LCJleHAiOjE4MDA4MDc4MDd9.Quz-wAqAMNxv3KFnMG0smo_L646ynamZHe603dwzp2o30w6XDBDOrBg8gHOLMzkvXK6GDthzNCtEXx0Gyo0SfA`,
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
      <VoteContainer debateInfo={debateInfo} />
      <CommentContainer debateInfo={debateInfo} />
    </div>
  );
}
