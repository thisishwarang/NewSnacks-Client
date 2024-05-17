"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [prevScrollpos, setPrevScrollpos] = useState(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const [visible, setVisible] = useState(true); // 내비게이션 바 표시 여부 상태
  const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&prompt=login`;
  const [isLogined, setIsLogined] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [isLogined, setIsLogined]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !navbarRef.current.contains(event.target) ||
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const visible = prevScrollpos > currentScrollPos;

        setPrevScrollpos(currentScrollPos);
        setVisible(visible);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [prevScrollpos]);
  // const scrollToSection = (ref) => {
  //   if (ref && ref.current) {
  //     ref.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  const handleLoginClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const handleLogoutClick = () => {
    const realLogout = window.confirm("정말 로그아웃 하시겠습니까?");
    if (realLogout) {
      localStorage.removeItem("accessToken");
      setIsLogined(false);
      router.push("/");
    }
  };

  return (
    <nav
      className={visible ? styles.navbarVisible : styles.navbarHidden}
      ref={navbarRef}
    >
      <div className={styles.navLeft}>
        <Link href={"/"} className={styles.logo}>
          <img src={"/로고.png"} alt="logo" />
        </Link>
        <div className={styles.span}>간식같이 간편한 해외 뉴스</div>
      </div>
      <div className={styles.navRight}>
        {isLogined ? (
          <button className={styles.loginButton} onClick={handleLogoutClick}>
            로그아웃
          </button>
        ) : (
          <button className={styles.loginButton} onClick={handleLoginClick}>
            로그인
          </button>
        )}

        <button
          className={styles.hamburgerButton}
          id="hamburger-button"
          ref={hamburgerRef}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Image
            className={styles.hamburgerImage}
            src={"/햄버거메뉴.png"}
            alt="햄버거"
            width={25}
            height={25}
          />
        </button>
      </div>
      {menuOpen && <HamburgerMenu />}
    </nav>
  );
};
export default Navbar;
