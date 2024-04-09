"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./NewsDetailPage.module.css";
import CommentSection from "../CommentSection/CommentSection";
import Image from "next/image";

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

  // const handleLikeButton = async () => {
  //   // let accessToken = localStorage.getItem("accessToken");
  //   if (true) {
  //     try {
  //       let response;
  //       if (!newsInfo.isLiked) {
  //         response = await axios.post(
  //           `https://dev.jaeyun.shop/v1/articles/${params.newsId}/likes`,
  //           null,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`,
  //             },
  //           }
  //         );
  //       } else {
  //         response = await axios.delete(
  //           `https://dev.jaeyun.shop/v1/articles/${params.newsId}/likes`,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`,
  //             },
  //           }
  //         );
  //       }
  //       if (response.status === 200) {
  //         // 서버에서 좋아요 상태와 하트 카운트가 업데이트되었다고 가정합니다.
  //         // 서버에서 새로운 데이터를 가져와서 클라이언트 상태를 업데이트합니다.
  //         getNewsArticle();
  //       }
  //     } catch (error) {
  //       console.log("좋아요 버튼 에러", error);
  //     }
  //   }
  // };
  const handleLikeBtnClick = async () => {
    try {
      const response = await axios.post(
        `https://dev.jaeyun.shop/v1/articles/${params.newsId}/likes`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`,
          },
        }
      );
      getNewsArticle();
      console.log("좋아요버튼클릭 후", response.data.data);
    } catch (error) {
      console.log("좋아요버튼클릭 에러", error);
    }
  };
  const handleDeleteLikeBtn = async () => {
    try {
      const response = await axios.delete(
        `https://dev.jaeyun.shop/v1/articles/${params.newsId}/likes`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`,
          },
        }
      );
      getNewsArticle();
    } catch (error) {
      console.log("좋취 에러", error);
    }
  };

  if (!newsInfo) {
    return <div>Loading...</div>; // 기사 정보를 가져올 때까지 로딩 중 상태를 보여줍니다.
  }
  const summarys = newsInfo.summary
    ? newsInfo.summary.split("\n").slice(0, -1)
    : null;
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
                onClick={handleDeleteLikeBtn}
              >
                <img src="/좋아요-after.png" alt="likebuttonafter" />
              </button>
            ) : (
              <button
                className={styles.likeButton}
                onClick={handleLikeBtnClick}
              >
                <img src="/좋아요-before.png" alt="likebuttonbefore" />
              </button>
            )}
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
          {newsInfo.imageUrl ? (
            <Image
              className={styles.articleImg}
              src={`https://${newsInfo.imageUrl}`}
              alt="postImage"
              // width={800}
              // height={400}
              fill
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
                    <>
                      <p key={index}>{summary}</p>
                      <span className={styles.emptySummarySpace}></span>
                    </>
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
                  <>
                    <p key={index}>{paragraph}</p>
                    <div className={styles.emptySpace}></div>
                  </>
                ))}
              </div>
            ) : null}
          </article>
        </section>
        <CommentSection articleId={newsInfo.id} />
      </section>
    </div>
  );
}
