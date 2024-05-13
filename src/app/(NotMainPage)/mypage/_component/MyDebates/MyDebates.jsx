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
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `https://dev.jaeyun.shop/v1/members/me/participated-debates`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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

  return (
    <div className={styles.container}>
      <header className={styles.myDebatesTitle}>내가 참여한 팝콘토론</header>
      <div className={styles.debatesSection}>
        <div className={styles.carousel} ref={carouselRef}>
          {myDebates.map((myDebate, i) => (
            <MyDebate key={i} myDebate={myDebate} />
          ))}
        </div>
      </div>
    </div>
  );
}
