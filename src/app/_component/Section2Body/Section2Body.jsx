"use client";
import { useEffect, useState } from "react";
import Section2Left from "../Section2Left/Section2Left";
import Section2Right from "../Section2Right/Section2Right";
import styles from "./Section2Body.module.css";
import axios from "axios";
import MobileSection2Body from "./MobileSection2Body/MobileSection2Body";

export default function Section2Body() {
  const [thisWeekNews, setThisWeekNews] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredId, setHoveredId] = useState(0);
  // const accessToken = localStorage.getItem("accessToken");
  const handleHoverChange = (hovered) => {
    setIsHovered(hovered);
  };
  useEffect(() => {
    const getThisWeekNews = async () => {
      try {
        const response = await axios.get(
          "https://dev.jaeyun.shop/v1/articles/main",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("이번주 뉴스", response.data);
        setThisWeekNews(response.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    getThisWeekNews();
  }, []);
  return (
    <div className={styles.section2Body}>
      <div className={styles.leftSection}>
        <Section2Left
          onHoverChange={handleHoverChange}
          setHoveredId={setHoveredId}
          thisWeekNews={thisWeekNews}
        />
      </div>
      <div className={styles.rightSection}>
        <Section2Right
          thisWeekNews={thisWeekNews}
          hoveredId={hoveredId}
          isHovered={isHovered}
        />
      </div>
      <div className={styles.mobileSection}>
        <MobileSection2Body thisWeekNews={thisWeekNews} />
      </div>
    </div>
  );
}
