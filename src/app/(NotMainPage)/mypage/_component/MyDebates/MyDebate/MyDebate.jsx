import Link from "next/link";
import styles from "./MyDebate.module.css";

const MyDebate = ({ myDebate }) => {
  return (
    <div className={styles.container}>
      <Link href={`/popcorn-debate/${myDebate.id}`}>
        <div className={styles.title}>{myDebate.title}</div>
      </Link>
    </div>
  );
};
export default MyDebate;
