"use client";
import Image from "next/image";
import styles from "./Section2Right.module.css";
import { useState, useEffect } from "react";

export default function Section2Right(props) {
  let { isHovered, hoveredId, thisWeekNews } = props;
  const [news, setNews] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(isHovered);
  }, [isHovered]);
  useEffect(() => {
    if (thisWeekNews && thisWeekNews.data) {
      setNews(thisWeekNews.data);
    }
  }, [thisWeekNews]);
  const hoveredNews = news.find((value) => value.id === hoveredId);
  if (!hoveredNews) {
    return <div></div>;
  }
  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.imgContainer}>
        {hoveredNews.imageUrl ? (
          <Image
            className={styles.img}
            src={`https://${hoveredNews.imageUrl}`}
            alt="image"
            fill
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.textSection}>
        {hoveredNews ? hoveredNews.summary : null}
      </div>
    </div>
  );
}
