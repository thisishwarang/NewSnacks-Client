"use client";
import { useRouter } from "next/navigation";
import styles from "./FilterHeader.module.css";
import { useEffect, useState } from "react";

const filterMappings = {
  전체: "all",
  예술: "art",
  환경: "environment",
  경제: "economy",
  정치: "politics",
  기술: "technology",
};
export default function FilterHeader({ filter, filters, onFilterChange }) {
  const router = useRouter();
  const handleFilterChange = (value) => {
    onFilterChange(value);
    router.push(`/category/${filterMappings[value]}`);
  };
  return (
    <header className={styles.header}>
      <ul className={styles.filters}>
        {filters.map((value, i) => (
          <li key={i}>
            <button
              className={`${styles.filter} ${
                filter.params.subject === filterMappings[value]
                  ? styles.selected
                  : ""
              }
              `}
              onClick={() => handleFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
