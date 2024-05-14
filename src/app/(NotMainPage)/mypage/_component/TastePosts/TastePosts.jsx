"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./TastePosts.module.css";
import axios from "axios";
import SurveyPost from "./SurveyPost/SurveyPost";

const TastePosts = () => {
  const [tastePosts, setTastePosts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    getTastePosts();
  }, []);
  const getTastePosts = async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/members/me/articles/interested`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTastePosts(response.data.data.slice(0, 9));
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
};
export default TastePosts;
