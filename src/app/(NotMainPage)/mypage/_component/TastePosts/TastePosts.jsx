"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./TastePosts.module.css";
import axios from "axios";
import SurveyPost from "./SurveyPost/SurveyPost";

export default function TastePosts() {
  const [tastePosts, setTastePosts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    getTastePosts();
  }, []);
  const getTastePosts = async () => {
    try {
      const response = await axios.get(`/data/myTastePosts.json`);
      setTastePosts(response.data.data);
    } catch (error) {
      console.log("취향 에러");
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
      <div className={styles.tasteTitle}>
        <span>#뉴스낵스#취향저격</span>
      </div>
      <div className={styles.tastePostsSection}>
        <div className={styles.carousel} ref={carouselRef}>
          {tastePosts.map((tastePost, i) => (
            <SurveyPost key={i} tastePost={tastePost} />
          ))}
        </div>
      </div>
    </div>
  );
}
