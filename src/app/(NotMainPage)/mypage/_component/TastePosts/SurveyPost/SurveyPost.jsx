import styles from "./SurveyPost.module.css";
import Image from "next/image";

const SurveyPost = ({ tastePost }) => {
  console.log(tastePost);
  return (
    <div className={styles.post}>
      <div className={styles.postImg}><Image
        src={`https://${tastePost.imageUrl}`}
        alt="tasteImage"
        layout="fill" 
        objectFit="cover" 
        objectPosition="center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      /></div>
      
      <div className={styles.postText}>{tastePost.title}</div>
    </div>
  );
};
export default SurveyPost;
