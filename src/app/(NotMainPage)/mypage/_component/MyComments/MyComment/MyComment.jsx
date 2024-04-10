"use client";
import styles from "./MyComment.module.css";
import { useRouter } from "next/navigation";
export default function MyComment({ comment }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${comment.articleId}`);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.comment}>{comment.content}</div>
      <div className={styles.title}>{comment.articleTitle}</div>
    </div>
  );
}
