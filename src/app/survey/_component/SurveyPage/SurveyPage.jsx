"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import styles from "./SurveyPage.module.css";
import axios from "axios";
// import Link from "next/link";
// import { useRecoilState } from "recoil";
// import { surveyResultState } from "@/app/_component/recoil/surveyResultState";

const SurveyPage = () => {
  // 질문과 선택지 배열
  const questions = [
    {
      question:
        "일본의 주가인 닛케이 지수는 80년대 버블 시절이 가장 높았을까요?",
      options: ["O", "X"],
      category: "money",
      isLeftTrue: true,
    },
    {
      question: "최근 르세라핌이 콜라보한 브랜드가 아닌 것은 무엇일까요?",
      options: ["CASETIFY", "GENTLE MONSTER"],
      category: "trend",
      isLeftTrue: true,
    },
    {
      question: "2023년 기준, 생활폐기물 재활용율 1위 국가는 00입니다.",
      options: ["독일", "대한민국"],
      category: "society",
      isLeftTrue: true,
    },
    {
      question: "최근 프랑스에서는 OO 의무화를 시도 중입니다. OO은 뭘까요?",
      options: ["흡연 금지", "교복"],
      category: "money",
      isLeftTrue: true,
    },
    {
      question: "오늘은 애인과 등산가는 날. 무슨 신발을 신을까요?",
      options: ["Roa Hiking", "K2"],
      category: "trend",
      isLeftTrue: true,
    },
    {
      question:
        "이스라엘 팔레스타인 전쟁이 시작된 이후, 유대인이 3번째로 많이 사는 프랑스는 이스라엘 지지 시위를 금지했어요.",
      options: ["O", "X"],
      category: "society",
      isLeftTrue: true,
    },
    {
      question: "현재 주가가 오르고 있는 카카오는 무엇일까요?",
      options: ["카카오 주식", "카카오 원자재"],
      category: "money",
      isLeftTrue: true,
    },
    {
      question: "최근 칸예 웨스트와 결별한 사람의 이름은 무엇일까요?",
      options: ["킴 카다시안", "킴 카사디안"],
      category: "trend",
      isLeftTrue: true,
    },
    {
      question:
        "국제 협력을 증진하고 세계평화를 유지하기 위한 목적으로 설립된 국제기구로, 인류 역사상 가장 큰 규모의 국가 간 연합체는 무엇일까요? ",
      options: ["UN", "UNICEF"],
      category: "society",
      isLeftTrue: true,
    },
  ];
  const correctAnswers = [
    { answer: "O", category: "money" },
    { answer: "GENTLE MONSTER", category: "trend" },
    { answer: "독일", category: "society" },
    { answer: "교복", category: "money" },
    { answer: "Roa Hiking", category: "trend" },
    { answer: "X", category: "society" },
    { answer: "카카오 원자재", category: "money" },
    { answer: "킴 카다시안", category: "trend" },
    { answer: "UN", category: "society" },
  ];
  const [userAnswers, setUserAnswers] = useState([]);
  const [categoryCount, setCategoryCount] = useState({
    money: 0,
    society: 0,
    trend: 0,
  });
  // const [surveyResult, setSurveyResult] = useRecoilState(surveyResultState);
  const [surveyResult, setSurveyResult] = useState();
  const router = useRouter();

  // 사용자 응답 상태
  const [responses, setResponses] = useState(
    Array(questions.length).fill(null)
  );
  // 현재 보여지는 질문의 인덱스
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const handleAnswerButtonClick = (answer, category) => {
    const newUserAnswers = [...userAnswers, { answer, category }];
    console.log(newUserAnswers);
    setUserAnswers(newUserAnswers);
    setCurrentQIndex(currentQIndex + 1);
    if (currentQIndex === questions.length - 1) {
      const result = calculateResult(newUserAnswers, correctAnswers);
      setSurveyResult(result);
    } 
  };

  const calculateResult = (userAnswers, correctAnswers) => {
    const categoryCounts = {
      money: 0,
      society: 0,
      trend: 0,
    };

    userAnswers.forEach((userAnswer, index) => {
      const correctAnswer = correctAnswers[index];
      if (userAnswer.answer === correctAnswer.answer) {
        const category = userAnswer.category;
        categoryCounts[category] += 1;
      }
    });
    // console.log(categoryCounts);
    return categoryCounts;
  };

  useEffect(() => {
    if (surveyResult) {
      patchTestResult();
    }
  }, [surveyResult]);

  const patchTestResult = async () => {
    const { money, society, trend } = surveyResult;
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/members/me/interest`,
        {
          moneyCount: money,
          societyCount: society,
          trendCount: trend,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const goHomepage = () => {
    router.push("/");
  };

  return (
    <section className={styles.container}>
      {currentQIndex < questions.length ? (
        <>
          <span className={styles.qNum}>{currentQIndex + 1}.</span>
          <h1 className={styles.question}>
            {questions[currentQIndex].question}
          </h1>
          <div className={styles.optionsContainer}>
            <div className={styles.explain}>
              버튼을 클릭하여 문제를 맞히세요
            </div>
            <div className={styles.surveyBtns}>
              {questions[currentQIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerButtonClick(
                      option,
                      questions[currentQIndex].category
                    )
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.endContainer}>
          <div className={styles.firstDiv}>
            사실 이 퀴즈는 당신을 파악하기 위한 연막
          </div>
          <div className={styles.secondDiv}>간식 대신 뉴스낵스를 드립니다</div>
          <button className={styles.button} onClick={goHomepage}>
            Go!
          </button>
        </div>
      )}
    </section>
  );
};
export default SurveyPage;
