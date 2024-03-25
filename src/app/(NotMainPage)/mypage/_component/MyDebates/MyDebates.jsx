"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MyDebates.module.css";
import axios from "axios";
import MyDebate from "./MyDebate/MyDebate";

export default function MyDebates() {
  const [myDebates, setMyDebates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    getMyDebates();
  }, []);
  const getMyDebates = async () => {
    try {
      const response = await axios.get(`/data/myDebates.json`);
      setMyDebates(response.data.data);
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
      <header className={styles.myDebatesTitle}>내가 참여한 팝콘토론</header>
      <div className={styles.debatesSection}>
        {/* <button
          className=""
          direction="left"
          state={scrollPosition === 0 ? "disable" : "enable"}
          onClick={handlePrevClick}
        >
          왼
        </button> */}
        <div className={styles.carousel} ref={carouselRef}>
          {myDebates.map((myDebate, i) => (
            <MyDebate myDebate={myDebate} key={i} />
          ))}
        </div>
        {/* <button
          className=""
          direction="right"
          state={
            carouselRef.current
              ? scrollPosition >=
                carouselRef.current.scrollWidth -
                  carouselRef.current.clientWidth
                ? "disable"
                : "enable"
              : "disable"
          }
          onClick={handleNextClick}
        >
          오
        </button> */}
      </div>
    </div>
  );
}
