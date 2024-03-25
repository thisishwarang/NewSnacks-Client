"use client";
import FilterHeader from "../FilterHeader/FilterHeader";
import PostBoard from "../PostBoard/PostBoard";
import { useRecoilState } from "recoil";
import styles from "./Main.module.css";
import { categoryFilterState } from "@/app/_component/recoil/categoryFilterState";

const filters = ["전체", "예술", "환경", "경제", "정치", "기술"];
export default function Main() {
  const [filter, setFilter] = useRecoilState(categoryFilterState);

  return (
    <main className={styles.main}>
      <FilterHeader
        filters={filters}
        filter={filter}
        onFilterChange={setFilter}
      />
      <PostBoard filter={filter} />
    </main>
  );
}
