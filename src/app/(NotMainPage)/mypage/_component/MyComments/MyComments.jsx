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
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://dev.jaeyun.shop/v1/members/me/comments",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
