"use client";
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

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ""}`}>
      <img className={styles.img} src={"/전쟁사진.png"} alt="image" />
      <div className={styles.textSection}>
        {hoveredNews ? hoveredNews.summary : null}
      </div>
    </div>
  );
}
