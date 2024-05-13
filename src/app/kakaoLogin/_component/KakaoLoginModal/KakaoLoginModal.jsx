"use client";
import { useEffect, useState } from "react";
import styles from "./KakaoLoginModal.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const KakaoLoginModal = () => {
  let AUTHORIZATION_CODE;
  if (typeof document !== "undefined") {
    AUTHORIZATION_CODE = new URL(document.location.toString()).searchParams.get(
      "code"
    );
    console.log(AUTHORIZATION_CODE);
  }
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);
  const router = useRouter();

  const getToken = async () => {
    if (accessTokenFetching) return;
    console.log("hihi");
    try {
      setAccessTokenFetching(true);
      console.log("try실행됨");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          provider: "KAKAO",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTHORIZATION-CODE": AUTHORIZATION_CODE,
          },
        }
      );
      console.log("로그인결과", response.data.data.accessToken);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (AUTHORIZATION_CODE) {
      getToken();
    }
  }, [AUTHORIZATION_CODE]);
  return <div>Loading...</div>;
};
export default KakaoLoginModal;
