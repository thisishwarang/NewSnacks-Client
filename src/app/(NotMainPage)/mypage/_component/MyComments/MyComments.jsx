"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MyComments.module.css";
import axios from "axios";
import MyComment from "./MyComment/MyComment";

export default function MyComments() {
  const [comments, setComments] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    getMyComments();
  }, []);
  const getMyComments = async () => {
    try {
      const response = await axios.get("/data/myComments.json");
      setComments(response.data.data);
    } catch (error) {
      console.log("에러발생");
    }
  };
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [scrollPosition]);

  const handlePrevClick = () => {
    if (scrollPosition === 0) return;
    if (carouselRef.current) {
      // 현재 스크롤 위치에서 Carousel 컴포넌트의 길이만큼 감소
      const newScrollPosition =
        scrollPosition - carouselRef.current.clientWidth;
      setScrollPosition(newScrollPosition);
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      if (scrollPosition >= carouselRef.current.clientWidth * 3) return;
      // 현재 스크롤 위치에서 Carousel 컴포넌트의 길이만큼 증가
      const newScrollPosition =
        scrollPosition + carouselRef.current.clientWidth;
      setScrollPosition(newScrollPosition);
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles.commentsTitle}>내가 작성한 댓글</header>
      <div className={styles.commentsSection}>
        <div className={styles.carousel} ref={carouselRef}>
          {comments.map((comment, i) => (
            <MyComment comment={comment} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
