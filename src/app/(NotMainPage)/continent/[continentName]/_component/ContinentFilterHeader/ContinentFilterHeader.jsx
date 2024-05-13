"use client";
import { useRouter } from "next/navigation";
import styles from "./ContinentFilterHeader.module.css";

const filterMappings = {
  전체: "all",
  남아메리카: "south-america",
  북아메리카: "north-america",
  아시아: "asia",
  아프리카: "africa",
  오세아니아: "oceania",
  유럽: "europe",
};
const ContinentFilterHeader = ({ filter, filters, onFilterChange }) => {
  const router = useRouter();
  console.log(filter);
  const handleFilterChange = (value) => {
    console.log(value);
    onFilterChange(value);
    router.push(`/continent/${filterMappings[value]}`);
  };
  return (
    <header className={styles.header}>
      <ul className={styles.filters}>
        {filters.map((value, i) => (
          <li key={i}>
            <button
              className={`${styles.filter} 
              ${
                filter.continentName === filterMappings[value] &&
                styles.selected
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
};
export default ContinentFilterHeader;
