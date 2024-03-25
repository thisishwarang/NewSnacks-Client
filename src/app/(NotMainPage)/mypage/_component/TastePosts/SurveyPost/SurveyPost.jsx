import styles from "./SurveyPost.module.css";
export default function SurveyPost({ tastePost }) {
  return (
    <div className={styles.post}>
      <div className={styles.postHashtag}>#{tastePost.hashtag}</div>
      <img className={styles.postImg} src={tastePost.imgUrl} alt="tasteImg" />
      <div className={styles.postText}>{tastePost.text}</div>
    </div>
  );
}
