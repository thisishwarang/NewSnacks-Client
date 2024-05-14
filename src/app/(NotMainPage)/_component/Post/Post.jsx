"use client";
import { useRouter } from "next/navigation";
import styles from "./Post.module.css";
import Image from "next/image";

const categoryMappings = {
  ART: "예술",
  ENVIRONMENT: "환경",
  ECONOMY: "경제",
  POLITICS: "정치",
  TECHNOLOGY: "기술",
};

const Post = ({ article }) => {
  const router = useRouter();
  if (!article) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={styles.postBox}
      onClick={() => {
        router.push(`/post/${article.id}`);
      }}
    >
      <div className={styles.imageSection}>
        <Image
          className={styles.img}
          src={`https://${article.imageUrl}`}
          alt="articleImage"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.titleSection}>{article.title}</div>
      <div className={styles.informationSection}>
        <div className={styles.date}>
          {article.createdAt ? article.createdAt.split("T")[0] : ""}
        </div>
        <div className={styles.category}>
          {categoryMappings[article.sectionCategory]}
        </div>
      </div>
    </div>
  );
};
export default Post;
