import styles from "./MyComment.module.css";
export default function MyComment({ comment }) {
  return (
    <div className={styles.container}>
      <div className={styles.comment}>{comment.content}</div>
      <div className={styles.title}>{comment.articleTitle}</div>
    </div>
  );
}
