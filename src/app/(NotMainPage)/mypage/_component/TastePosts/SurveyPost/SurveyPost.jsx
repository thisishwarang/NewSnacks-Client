'use client'
import styles from "./SurveyPost.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";


const SurveyPost = ({ tastePost }) => {
  const router = useRouter();

  const handleRoute = () => {
    router.push(`/post/${tastePost.id}`)
  }
  console.log(tastePost);
  return (
    <div className={styles.post} onClick={handleRoute}>
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
