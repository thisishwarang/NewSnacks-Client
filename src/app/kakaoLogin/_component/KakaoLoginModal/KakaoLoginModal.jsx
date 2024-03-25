"use client";
import { useEffect, useState } from "react";
import styles from "./KakaoLoginModal.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function KakaoLoginModal() {
  const AUTHORIZATION_CODE = new URL(
    document.location.toString()
  ).searchParams.get("code");
  console.log(AUTHORIZATION_CODE);
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
      console.log(response);

      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (AUTHORIZATION_CODE) {
      getToken();
      localStorage.setItem(
        "accessToken",
        "eyJKV1QiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEwLCJyb2wiOiJVU0VSIiwiaWF0IjoxNzA1NTk4MjA3LCJleHAiOjE4MDA4MDc4MDd9.Quz-wAqAMNxv3KFnMG0smo_L646ynamZHe603dwzp2o30w6XDBDOrBg8gHOLMzkvXK6GDthzNCtEXx0Gyo0SfA"
      );
    }
  }, [AUTHORIZATION_CODE]);
  return <div>Loading...</div>;
}
