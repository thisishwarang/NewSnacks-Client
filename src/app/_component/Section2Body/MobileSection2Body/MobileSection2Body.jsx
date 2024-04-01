"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MobileSection2Body.module.css";
import Post from "@/app/(NotMainPage)/_component/Post/Post";

export default function MobileSection2Body({ thisWeekNews }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  let news = thisWeekNews.data;
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
      <div className={styles.carousel} ref={carouselRef}>
        {news && news.map((article, i) => <Post article={article} key={i} />)}
      </div>
    </div>
  );
}
