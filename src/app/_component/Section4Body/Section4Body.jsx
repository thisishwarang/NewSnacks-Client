"use client";
import Post from "@/app/(NotMainPage)/_component/Post/Post";
import Button from "../HamburgerMenu/Button/Button";
import DebatebarSection from "../DebateBarSection/DebatebarSection";
import styles from "./Section4Body.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Section4Body() {
  const [thisWeekPopcornDebate, setThisWeekPopcornDebate] = useState([]);
  //여기서 이번주 팝콘토론 api GET함
  //팝콘토론 id를 Button, Post로 넘겨줌
  useEffect(() => {
    const getThisWeekPopcornDebate = async () => {
      try {
        const response = await axios.get(
          "https://dev.jaeyun.shop/v1/debates/main",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEwLCJyb2wiOiJVU0VSIiwiaWF0IjoxNzA1NTk4MjA3LCJleHAiOjE4MDA4MDc4MDd9.Quz-wAqAMNxv3KFnMG0smo_L646ynamZHe603dwzp2o30w6XDBDOrBg8gHOLMzkvXK6GDthzNCtEXx0Gyo0SfA`,
            },
          }
        );
        console.log(response.data.data);
        const {
          agreeCount,
          disagreeCount,
          title,
          articleId,
          articleCreatedAt,
          articleTitle,
          debateId,
          ...rest
        } = response.data.data;
        setThisWeekPopcornDebate({
          agreeCount,
          disagreeCount,
          title,
          debateId,
          article: {
            id: articleId,
            createdAt: articleCreatedAt,
            title: articleTitle,
            ...rest,
          },
        });
      } catch (error) {
        console.error("Error fetching popcorn-debate data:", error);
      }
    };
    getThisWeekPopcornDebate();
  }, []);
  if (!thisWeekPopcornDebate) {
    return <div>Loading...</div>;
  }
  console.log(thisWeekPopcornDebate);

  return (
    <div className={styles.container}>
      <div className={styles.section4Left}>
        <div className={styles.titleDate}>2024년 2월 4주 주제</div>
        <div className={styles.debateTitle}>{thisWeekPopcornDebate.title}</div>
        <section className={styles.prosAndConsSection}>
          <DebatebarSection
            agreeCount={thisWeekPopcornDebate.agreeCount}
            disagreeCount={thisWeekPopcornDebate.disagreeCount}
          />
        </section>
        <div className={styles.debateButton}>
          <Button
            text={"투표하러 가기"}
            route={`/popcorn-debate/${thisWeekPopcornDebate.debateId}`}
          />
        </div>
      </div>
      <div className={styles.section4Right}>
        <div className={styles.section4RightSpan}>이번주 주제 뉴스로 보기↓</div>
        <section className={styles.postSection}>
          <Post article={thisWeekPopcornDebate.article} />
        </section>
      </div>
    </div>
  );
}
