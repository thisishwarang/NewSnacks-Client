"use client";
import TitleAndPopcornHeader from "@/app/_component/TitleAndPopcornHeader/TitleAndPopcornHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [username, setUsername] = useState("");
  const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  const router = useRouter();
  useEffect(() => {
    getName();
  }, []);
  const getName = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      const shouldLogin = window.confirm(
        "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (shouldLogin) {
        window.location.href = KAKAO_AUTH_URL;
      } else {
        router.push("/");
      }

      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/members/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsername(response.data.data.name);
    } catch (error) {
      console.log("마이페이지 에러", error);
    }
  };
  return (
    <div
      style={{
        paddingTop: "6rem",
      }}
    >
      <TitleAndPopcornHeader span={`${username}님의 페이지`} />
      {children}
    </div>
  );
};
export default Layout;
