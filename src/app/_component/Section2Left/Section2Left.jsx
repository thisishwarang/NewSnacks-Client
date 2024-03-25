"use client";
import { useEffect, useState } from "react";
import styles from "./Section2Left.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Section2Left(props) {
  let { onHoverChange, setHoveredId, thisWeekNews } = props;
  const [news, setNews] = useState([]);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const handleHover = () => {};

  useEffect(() => {
    if (thisWeekNews && thisWeekNews.data) {
      setNews(thisWeekNews.data);
    }
  }, [thisWeekNews]);
  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <ul className={styles.ul}>
          {news.map((item, i) => (
            <Link href={`/post/${item.id}`} key={i}>
              <li
                className={styles.title}
                onMouseEnter={() => {
                  onHoverChange(true);
                  setHoveredId(item.id);
                }}
                onMouseLeave={() => onHoverChange(false)}
              >
                <span>{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <Link href={"/category/all"}>
        <div className={styles.buttonDiv}>
          <button className={styles.button}>전체 뉴스 보기</button>
        </div>
      </Link>
    </div>
  );
}
