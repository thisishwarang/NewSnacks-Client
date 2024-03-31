"use client";
import { useState } from "react";
import styles from "./VoteSection.module.css";
import axios from "axios";

export default function VoteSection({ debateInfo, getDebateDetailPage }) {
  const [draggedOver, setDraggedOver] = useState(null);
  const [voteResult, setVoteResult] = useState(null);

  const postVoteResult = async () => {
    try {
      const response = await axios.post(
        `https://dev.jaeyun.shop/v1/debates/${debateInfo.debateId}/votes`,
        {
          vote: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`,
          },
        }
      );
      console.log(response);
      getDebateDetailPage();
    } catch (error) {
      console.log("투표에러", error);
    }
  };

  const handleDragOver = (e, boxType) => {
    e.preventDefault();
    setDraggedOver(boxType);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = () => {
    if (draggedOver) {
      console.log(`팝콘이 ${draggedOver} 박스로 들어갔습니다.`);
      draggedOver === "pro" ? setVoteResult(true) : setVoteResult(false);
      postVoteResult();
    }
    setDraggedOver(null);
  };

  return (
    <div>
      <div className={styles.voteContainer}>
        <div
          className={`${styles.proBox} ${
            draggedOver === "pro" && styles.draggedOver
          }`}
          onDragOver={(e) => handleDragOver(e, "pro")}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            backgroundColor: draggedOver === "pro" ? "#ffcc60" : "white",
          }}
        >
          찬성
        </div>
        <img
          src={"/팝콘.png"}
          alt="popcorn"
          className={styles.popcorn}
          draggable="true"
        />
        <div
          className={`${styles.conBox} ${
            draggedOver === "con" && styles.draggedOver
          }`}
          onDragOver={(e) => handleDragOver(e, "con")}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            backgroundColor: draggedOver === "con" ? "#ffcc60" : "white",
          }}
        >
          반대
        </div>
      </div>
    </div>
  );
}
