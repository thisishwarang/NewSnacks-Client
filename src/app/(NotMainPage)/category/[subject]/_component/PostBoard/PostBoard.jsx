"use client";

import Post from "@/app/(NotMainPage)/_component/Post/Post";
import styles from "./PostBoard.module.css";
import { useState, useEffect } from "react";
import SortAndSearch from "../SortAndSearch/SortAndSearch";
import axios from "axios";

const sectionCategoryMappings = {
  전체: "",
  예술: "ART",
  환경: "ENVIRONMENT",
  경제: "ECONOMY",
  정치: "POLITICS",
  기술: "TECHNOLOGY",
};
const locationCategoryMappings = {
  전체: "",
  북아메리카: "NORTHAMERICA",
  남아메리카: "SOUTHAMERICA",
  아시아: "ASIA",
  아프리카: "AFRICA",
  오세아니아: "OCEANIA",
  유럽: "EUROPE",
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

  async function fetchArticles(page) {
    try {
      let requestURL;
      if (sectionCategoryMappings.hasOwnProperty(filter)) {
        requestURL = `https://dev.jaeyun.shop/v1/articles?order=${sortOrder}&sectionCategory=${sectionCategoryMappings[filter]}&page=${page}`;
      } else if (locationCategoryMappings.hasOwnProperty(filter)) {
        requestURL = `https://dev.jaeyun.shop/v1/articles?order=${sortOrder}&locationCategory=${locationCategoryMappings[filter]}&page=${page}`;
      } else {
        console.error("유효하지 않은 filter 값입니다.");
        return [];
      }

      const response = await axios.get(requestURL);
      console.log(response.data.data);
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
      if (newArticles.length === 0) {
        alert("더이상 뉴스가 없어요ㅠ");
      }
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
          {articles.length !== 0 ? (
            articles.map((article, i) => (
              <li key={i}>
                <Post article={article} />
              </li>
            ))
          ) : (
            <div className={styles.noArticles}>보여드릴 뉴스가 없어요ㅠㅠ</div>
          )}
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
