"use client";
import { useEffect, useState } from "react";
import styles from "./VoteSection.module.css";
import axios from "axios";

export default function VoteSection({ debateInfo }) {
  const [draggedOver, setDraggedOver] = useState(null);
  const [voteResult, setVoteResult] = useState(null);

  const postVoteResult = async () => {
    console.log("voteResult", voteResult);
    try {
      const response = await axios.post(
        `https://dev.jaeyun.shop/v1/debates/${debateInfo.debateId}/votes`,
        {
          vote: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEwLCJyb2wiOiJVU0VSIiwiaWF0IjoxNzA1NTk4MjA3LCJleHAiOjE4MDA4MDc4MDd9.Quz-wAqAMNxv3KFnMG0smo_L646ynamZHe603dwzp2o30w6XDBDOrBg8gHOLMzkvXK6GDthzNCtEXx0Gyo0SfA`,
          },
        }
      );
      console.log(response);
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
  console.log(voteResult);
  // useEffect(() => {
  //   if (voteResult !== null || voteResult !== undefined) {
  //     postVoteResult();
  //   }
  // }, [voteResult]);
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
