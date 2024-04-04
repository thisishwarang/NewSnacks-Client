"use client";
import { useEffect, useState } from "react";
import styles from "./KakaoLoginModal.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function KakaoLoginModal() {
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
        "https://dev.jaeyun.shop/v1/auth/login",
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
      //response.data.data.accessToken 이거 로컬스토리지에 넣으면 됨
      localStorage.setItem("accessToken", process.env.NEXT_PUBLIC_ACCESSTOKEN);
      //나중에 response값에서 토큰  저장하면 됨.
      router.back();
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
}
