"use client";

import Post from "@/app/(NotMainPage)/_component/Post/Post";
import styles from "./PostBoard.module.css";
import { useState, useEffect } from "react";
import SortAndSearch from "../SortAndSearch/SortAndSearch";
import axios from "axios";

const filterMappings = {
  전체: "ALL",
  예술: "ART",
  환경: "ENVIRONMENT",
  경제: "ECONOMY",
  정치: "POLITICS",
  기술: "TECHNOLOGY",
};
export default function PostBoard({ filter }) {
  console.log("postboard", filter);
  const [sortOrder, setSortOrder] = useState("RECENT");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getInitialArticles();
  }, [sortOrder, filter]);
  //sortOrder가 바뀔때마다 아티클 새로 조회하는지 점검 필요

  async function fetchArticles(page) {
    try {
      const response = await axios.get(
        `https://dev.jaeyun.shop/v1/articles?order=${sortOrder}&category=${filterMappings[filter]}&page=${page}`
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      return [];
    }
  }

  const getInitialArticles = async () => {
    setLoading(true);
    try {
      const initialArticles = await fetchArticles(0);
      console.log("initial", initialArticles);
      setArticles(initialArticles);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreArticles = async () => {
    setLoading(true);
    try {
      const newArticles = await fetchArticles(page + 1); // 다음 페이지의 데이터 가져오기
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <SortAndSearch sortOrder={sortOrder} onSortChange={setSortOrder} />
      <div className={styles.posts}>
        <ul>
          {articles.map((article, i) => (
            <li key={i}>
              <Post article={article} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.moreposts}>
        <div className={styles.buttonDiv}>
          <button className={styles.button} onClick={loadMoreArticles}>
            더보기
          </button>
        </div>
      </div>
    </div>
  );
}
