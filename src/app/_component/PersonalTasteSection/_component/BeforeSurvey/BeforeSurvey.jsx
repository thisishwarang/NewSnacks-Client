import styles from "./BeforeSurvey.module.css";
import Link from "next/link";

export default function BeforeSurvey() {
  return (
    <div className={styles.beforeSurvey}>
      <div className={styles.firstDiv}>뉴스낵스 보기 전에,</div>
      <div className={styles.secondDiv}>상식퀴즈 맞히면 간식 드려요</div>
      <Link href={"/survey"}>
        <button className={styles.goBtn}>Go!</button>
      </Link>
    </div>
  );
}
