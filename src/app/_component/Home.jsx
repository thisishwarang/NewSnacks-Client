"use client";
import styles from "./page.module.css";
import cx from "classnames";
import { useEffect, useRef, useState } from "react";
import Map from "./Map/Map";
import SectionHeader from "./SectionHeader/SectionHeader";
import MainPageNavbar from "./MainPageNavbar/MainPageNavbar";
import Section2Body from "./Section2Body/Section2Body";
import { usePathname } from "next/navigation";
import { useResetRecoilState } from "recoil";
import Section4Body from "./Section4Body/Section4Body";
import { categoryFilterState } from "./recoil/categoryFilterState";
import PersonalTasteSection from "../_component/PersonalTasteSection/PersonalTasteSection";

export default function Home() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const personalRef = useRef(null);
  const targetRefs = [
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
    personalRef,
  ];
  const resetFilterState = useResetRecoilState(categoryFilterState);
  const [surveyResult, setSurveyResult] = useState(true);
  //api연동해서 데이터가 있고 없고로 분기처리 가능할듯
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/category")) {
      resetFilterState();
    }
  }, [pathname]);
  return (
    <>
      <MainPageNavbar targetRefs={targetRefs} />
      <main className={styles.container}>
        <section
          ref={section1Ref}
          className={cx(styles.section, styles.section1)}
        >
          <div className={styles.section1Wrapper}>
            <img src={"/메인1.png"} alt="main1" />
          </div>
        </section>
        {/* <div className={styles.emptySpace}>
          <img
            className={styles.policeline}
            src={"/폴리스라인1.png"}
            alt="폴리스라인1"
          />
        </div> */}
        <section className={styles.personalTasteSection} ref={personalRef}>
          <PersonalTasteSection surveyResult={surveyResult} />
        </section>
        <section
          ref={section2Ref}
          className={cx(styles.section, styles.section2)}
        >
          <div className={styles.section2Wrapper}>
            <div className={styles.sectionHeader}>
              <SectionHeader
                span={"이번주 이 뉴스 놓치면 손해"}
                lineWidth={39}
              />
            </div>
            <Section2Body />
          </div>
        </section>
        {/* <div className={styles.emptySpace}>
          <img
            className={styles.policeline}
            src={"/폴리스라인2.png"}
            alt="폴리스라인2"
          />
        </div> */}
        <section
          ref={section3Ref}
          className={cx(styles.section, styles.section3)}
        >
          <div className={styles.section3Wrapper}>
            <div className={styles.sectionHeader}>
              <SectionHeader
                span={"여행은 비싸도 뉴스는 공짜니까"}
                lineWidth={34}
              />
            </div>
            <div className={styles.section3span}>
              <div className={styles.scrollText}>
                지도를 클릭하여 대륙별 뉴스를
                확인해보세요!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                지도를 클릭하여 대륙별 뉴스를
                확인해보세요!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;지도를
                클릭하여 대륙별 뉴스를
                확인해보세요!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;지도를
                클릭하여 대륙별 뉴스를
                확인해보세요!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;지도를
                클릭하여 대륙별 뉴스를
                확인해보세요!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;지도를
                클릭하여 대륙별 뉴스를
                확인해보세요!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </div>
            <div className={styles.section3Body}>
              <Map />
            </div>
          </div>
        </section>
        {/* <div className={styles.emptySpace}>
          <img
            className={styles.policeline}
            src={"/폴리스라인3.png"}
            alt="폴리스라인3"
          />
        </div> */}
        <section
          ref={section4Ref}
          className={cx(styles.section, styles.section4)}
        >
          <div className={styles.section4Wrapper}>
            <div className={styles.sectionHeader}>
              <SectionHeader span={"팝콘 가져와, 팝콘토론"} lineWidth={44} />
            </div>
            <Section4Body />
          </div>
        </section>
      </main>
    </>
  );
}
