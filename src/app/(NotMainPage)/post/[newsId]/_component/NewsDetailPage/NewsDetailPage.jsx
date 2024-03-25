"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./NewsDetailPage.module.css";
import CommentSection from "../CommentSection/CommentSection";

const categoryMappings = {
  ART: "예술",
  ENVIRONMENT: "환경",
  ECONOMY: "경제",
  POLITICS: "정치",
  TECHNOLOGY: "기술",
};

export default function NewsDetailPage({ params }) {
  //isLiked가 계속 false로만 가져와지는 버그 있음. heartCount는 1로 증가함
  //postman에서는 잘 되는것으로 보아 accessToken 문제일 가능성 높음. 이후 수정 필요
  const [newsInfo, setNewsInfo] = useState([]);

  useEffect(() => {
    getNewsArticle();
  }, []);

  const getNewsArticle = async () => {
    try {
      const response = await axios.get(
        `https://dev.jaeyun.shop/v1/articles/${params.newsId}`
      );
      setNewsInfo(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log("아티클상세조회 에러", error);
    }
  };

  const handleLikeButton = async () => {
    // let accessToken = localStorage.getItem("accessToken");
    if (true) {
      try {
        let response;
        if (!newsInfo.isLiked) {
          response = await axios.post(
            `https://dev.jaeyun.shop/v1/articles/${params.newsId}/likes`,
            null,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEwLCJyb2wiOiJVU0VSIiwiaWF0IjoxNzA1NTk4MjA3LCJleHAiOjE4MDA4MDc4MDd9.Quz-wAqAMNxv3KFnMG0smo_L646ynamZHe603dwzp2o30w6XDBDOrBg8gHOLMzkvXK6GDthzNCtEXx0Gyo0SfA`,
              },
            }
          );
        } else {
          response = await axios.delete(
            `https://dev.jaeyun.shop/v1/articles/${params.newsId}/likes`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEwLCJyb2wiOiJVU0VSIiwiaWF0IjoxNzA1NTk4MjA3LCJleHAiOjE4MDA4MDc4MDd9.Quz-wAqAMNxv3KFnMG0smo_L646ynamZHe603dwzp2o30w6XDBDOrBg8gHOLMzkvXK6GDthzNCtEXx0Gyo0SfA`,
              },
            }
          );
        }
        if (response.status === 200) {
          // 서버에서 좋아요 상태와 하트 카운트가 업데이트되었다고 가정합니다.
          // 서버에서 새로운 데이터를 가져와서 클라이언트 상태를 업데이트합니다.
          getNewsArticle();
        }
      } catch (error) {
        console.log("좋아요 버튼 에러", error);
      }
    }
  };

  if (!newsInfo) {
    return <div>Loading...</div>; // 기사 정보를 가져올 때까지 로딩 중 상태를 보여줍니다.
  }

  return (
    <div className={styles.container}>
      <section className={styles.leftSection}>
        <div className={styles.info}>
          <div className={styles.category}>
            {categoryMappings[newsInfo.sectionCategory]}
          </div>
          {/* <div className={styles.date}>{newsInfo.createdAt.split("T")[0]}</div> */}
        </div>
        <div className={styles.title}>{newsInfo.title}</div>
        <div className={styles.likeAndShare}>
          <div className={styles.likeDiv}>
            <button className={styles.likeButton} onClick={handleLikeButton}>
              {newsInfo.isLiked ? (
                <img src="/좋아요-after.png" alt="likebuttonafter" />
              ) : (
                <img src="/좋아요-before.png" alt="likebuttonbefore" />
              )}
            </button>
            <span className={styles.likeCount}>
              {newsInfo.heartCount ? newsInfo.heartCount : 0}
            </span>
          </div>
          <button className={styles.shareButton}>
            <img src="/공유.png" alt="share" />
          </button>
        </div>
      </section>
      <section className={styles.rightSection}>
        <div className={styles.imgSection}>
          <img src="/전쟁사진.png" alt="warimage" />
        </div>
        <section className={styles.summarySection}>
          <div className={styles.mainText}>
            <div>뉴스낵스 세줄 요약</div>
            <p>{newsInfo.summary}</p>
          </div>
        </section>
        <section className={styles.articleSection}>
          <article className={styles.article}>
            <p>{newsInfo.body}</p>
          </article>
        </section>
        <CommentSection articleId={newsInfo.id} />
      </section>
    </div>
  );
}
