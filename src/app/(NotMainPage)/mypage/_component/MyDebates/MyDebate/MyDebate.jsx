import styles from "./MyDebate.module.css";

export default function MyDebate({ myDebate }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{myDebate.title}</div>
    </div>
  );
}
