"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./NewsDetailPage.module.css";
import CommentSection from "../CommentSection/CommentSection";
import Image from "next/image";
import { useParams } from "next/navigation";

const categoryMappings = {
  ART: "예술",
  ENVIRONMENT: "환경",
  ECONOMY: "경제",
  POLITICS: "정치",
  TECHNOLOGY: "기술",
};

const NewsDetailPage = ({ params }) => {
  const [newsInfo, setNewsInfo] = useState();
  const param = useParams();
  let newsId = param.newsId;

  useEffect(() => {
    getNewsArticle(newsId);
  }, [param]);

  const getNewsArticle = async (newsId) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${newsId}`,
        {
          headers: headers,
        }
      );
      setNewsInfo(response.data.data);
      console.log(response);
    } catch (error) {
      console.log("아티클상세조회 에러", error);
    }
  };

  const handleLikeBtnClick = async (newsId) => {
    let accessToken = localStorage.getItem("accessToken");
    console.log(params.newsId);
    if (accessToken) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${newsId}/likes`,
          null,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        getNewsArticle(newsId);
        console.log("좋아요버튼클릭 후", response.data.data);
      } catch (error) {
        console.log("좋아요버튼클릭 에러", error);
      }
    } else {
      alert("로그인 이후 이용하세요");
    }
  };
  const handleDeleteLikeBtn = async (newsId) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${newsId}/likes`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getNewsArticle(newsId);
      console.log("좋아요버튼취소클릭 후", response.data.data);
    } catch (error) {
      console.log("좋취 에러", error);
    }
  };

  if (!newsInfo) {
    return <div>Loading...</div>; // 기사 정보를 가져올 때까지 로딩 중 상태를 보여줍니다.
  }
  const summarys = newsInfo.summary ? newsInfo.summary.split("\n") : null;
  const paragraphs = newsInfo.body ? newsInfo.body.split("\n") : null;
  console.log("news-isLiked", newsInfo.isLiked);
  return (
    <div className={styles.container}>
      <section className={styles.leftSection}>
        <div className={styles.info}>
          <div className={styles.category}>
            {categoryMappings[newsInfo.sectionCategory]}
          </div>
          <div className={styles.date}>
            {newsInfo.createdAt ? newsInfo.createdAt.split("T")[0] : ""}
          </div>
        </div>
        <div className={styles.title}>{newsInfo.title}</div>
        <div className={styles.likeAndShare}>
          <div className={styles.likeDiv}>
            {newsInfo.isLiked ? (
              <button
                className={styles.likeButton}
                onClick={() => handleDeleteLikeBtn(param.newsId)}
              >
                <img
                  src="/뉴스상세페이지좋아요-after.svg"
                  alt="likebuttonafter"
                />
              </button>
            ) : (
              <button
                className={styles.likeButton}
                onClick={() => handleLikeBtnClick(param.newsId)}
              >
                <img
                  src="/뉴스상세페이지좋아요-before.svg"
                  alt="likebuttonbefore"
                />
              </button>
            )}
            <span className={styles.likeCount}>
              {newsInfo.heartCount ? newsInfo.heartCount : 0}
            </span>
          </div>
          <button className={styles.shareButton}>
            <img src="/공유.svg" alt="share" />
          </button>
        </div>
      </section>
      <section className={styles.rightSection}>
        <div className={styles.imgSection}>
          {newsInfo.imageUrl ? (
            <Image
              className={styles.articleImg}
              src={`https://${newsInfo.imageUrl}`}
              alt="postImage"
              // width={800}
              // height={400}
              fill
              sizes="(max-width: 430px) 50vw , (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div></div>
          )}
          {}
        </div>
        <section className={styles.summarySection}>
          <div className={styles.mainText}>
            <div>뉴스낵스 세줄 요약</div>
            {/* <p>{newsInfo.summary}</p> */}
            <article className={styles.summaryArticle}>
              {summarys ? (
                <div>
                  {summarys.map((summary, index) => (
                    <div key={index}>
                      <p>{summary}</p>
                      <span className={styles.emptySummarySpace}></span>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          </div>
        </section>
        <section className={styles.articleSection}>
          <article className={styles.article}>
            {paragraphs ? (
              <div>
                {paragraphs.map((paragraph, index) => (
                  <div key={index}>
                    <p>{paragraph}</p>
                    <div className={styles.emptySpace}></div>
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        </section>
        <CommentSection articleId={newsInfo.id} />
      </section>
    </div>
  );
};
export default NewsDetailPage;
