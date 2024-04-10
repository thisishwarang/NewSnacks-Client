"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./LikedPosts.module.css";
import axios from "axios";
import Post from "@/app/(NotMainPage)/_component/Post/Post";

export default function LikedPosts() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    getLikedPosts();
  }, []);
  const getLikedPosts = async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `https://dev.jaeyun.shop/v1/members/me/liked-articles`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLikedPosts(response.data.data);
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
      const newScrollPosition =
        scrollPosition + carouselRef.current.clientWidth;
      setScrollPosition(newScrollPosition);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.likeTitle}>내가 좋아요한 뉴스낵스</div>
      <div className={styles.postsSection}>
        {/* <button
          className=""
          direction="left"
          state={scrollPosition === 0 ? "disable" : "enable"}
          onClick={handlePrevClick}
        >
          왼
        </button> */}
        <div className={styles.carousel} ref={carouselRef}>
          {likedPosts.map((likedPost, i) => (
            <Post article={likedPost} key={i} />
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
