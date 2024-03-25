"use client";
import styles from "./SortAndSearch.module.css";

export default function SortAndSearch({ sortOrder, onSortChange }) {
  return (
    <div className={styles.sortAndSearch}>
      <div className={styles.sortButtons}>
        <button
          className={sortOrder === "RECENT" ? styles.selectedBtn : ""}
          onClick={() => {
            onSortChange("RECENT");
          }}
        >
          최신순
        </button>
        <button
          className={sortOrder === "POPULAR" ? styles.selectedBtn : ""}
          onClick={() => {
            onSortChange("POPULAR");
          }}
        >
          좋아요순
        </button>
      </div>
      <div className={styles.searchBox}>
        <input className={styles.searchInput} type="text" placeholder="검색" />
        <button className={styles.searchButton}>
          <img
            className={styles.searchButtonImg}
            src="/검색버튼.png"
            alt="검색버튼"
          />
        </button>
      </div>
    </div>
  );
}
