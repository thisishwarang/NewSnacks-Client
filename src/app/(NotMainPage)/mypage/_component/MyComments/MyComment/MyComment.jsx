import styles from "./MyComment.module.css";
export default function MyComment({ comment }) {
  return (
    <div className={styles.container}>
      <div className={styles.comment}>{comment.comment}</div>
      <div className={styles.title}>{comment.title}</div>
    </div>
  );
}
