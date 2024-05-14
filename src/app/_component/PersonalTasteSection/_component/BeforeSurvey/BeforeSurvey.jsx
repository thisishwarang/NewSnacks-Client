"use client";
import { useRouter } from "next/navigation";
import styles from "./BeforeSurvey.module.css";

const BeforeSurvey = () => {
  const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  const router = useRouter();

  const handleGoClick = () => {
    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      const shouldLogin = window.confirm(
        "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (shouldLogin) {
        window.location.href = KAKAO_AUTH_URL;
      }
      return;
    } else {
      router.push("/survey");
    }
  };
  return (
    <div className={styles.beforeSurvey}>
      <div className={styles.firstDiv}>뉴스낵스 보기 전에,</div>
      <div className={styles.secondDiv}>상식퀴즈 맞히면 간식 드려요</div>
      <button className={styles.goBtn} onClick={handleGoClick}>
        Go!
      </button>
    </div>
  );
};

export default BeforeSurvey;
