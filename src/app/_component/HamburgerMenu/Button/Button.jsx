"use client";
import { useRouter } from "next/navigation";
import styles from "./Button.module.css";
 const Button = ({ text, route }) => {
  console.log(route);
  const router = useRouter();
  const handleRoute = () => {
    router.push(`${route}`);
  };
  return (
    <div className={styles.buttonDiv} onClick={handleRoute}>
      <button className={styles.button}>{text}</button>
    </div>
  );
}

export default Button