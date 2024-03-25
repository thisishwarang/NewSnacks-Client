"use client";
import { continentFilterState } from "@/app/_component/recoil/continentFilterState";
import styles from "./ContinentMain.module.css";
import { useRecoilState } from "recoil";
import ContinentFilterHeader from "../ContinentFilterHeader/ContinentFilterHeader";
import PostBoard from "@/app/(NotMainPage)/category/[subject]/_component/PostBoard/PostBoard";

const continentFilters = [
  "전체",
  "남아메리카",
  "북아메리카",
  "아시아",
  "아프리카",
  "오세아니아",
  "유럽",
];
export default function ContinentMain() {
  const [continentFilter, setContinentFilter] =
    useRecoilState(continentFilterState);
  return (
    <main className={styles.main}>
      <ContinentFilterHeader
        filters={continentFilters}
        filter={continentFilter}
        onFilterChange={setContinentFilter}
      />
      <PostBoard filter={continentFilter} />
    </main>
  );
}
