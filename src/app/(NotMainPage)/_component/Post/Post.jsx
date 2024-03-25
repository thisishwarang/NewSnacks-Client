"use client";
import { useRouter } from "next/navigation";
import styles from "./Post.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const categoryMappings = {
  ART: "예술",
  ENVIRONMENT: "환경",
  ECONOMY: "경제",
  POLITICS: "정치",
  TECHNOLOGY: "기술",
};

export default function Post({ article }) {
  const router = useRouter();
  if (!article) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={styles.postBox}
      onClick={() => {
        router.push(`/post/${article.id}`);
      }}
    >
      <div className={styles.imageSection}>
        <img
          className={styles.img}
          // src={`${article.imageUrl}`}
          src={"/전쟁사진.png"}
          alt="articleImage"
        />
      </div>
      <div className={styles.titleSection}>{article.title}</div>
      <div className={styles.informationSection}>
        <div className={styles.date}>{article.createdAt}</div>
        <div className={styles.category}>
          {categoryMappings[article.sectionCategory]}
        </div>
      </div>
    </div>
  );
}
