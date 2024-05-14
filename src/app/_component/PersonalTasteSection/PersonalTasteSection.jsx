"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AfterSurvey from "./_component/AfterSurvey/AfterSurvey";
import BeforeSurvey from "./_component/BeforeSurvey/BeforeSurvey";

const PersonalTasteSection = () => {
  const [tastePosts, setTastePosts] = useState([]);
  const [surveyResult, setSurveyResult] = useState(false);

  useEffect(() => {
    getCurationPost();
  }, []);

  const getCurationPost = async () => {
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken){
      return
    } else {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/members/me/articles/interested`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTastePosts(response.data.data.slice(0, 3));
        setSurveyResult(true)
      } catch (error) {
        if(error.response.data.status === 404){
          setSurveyResult(false)
        }
        console.log(error);
      }
    }
    
  };

  return (
    <>
      {!surveyResult ? <BeforeSurvey /> : <AfterSurvey tastePosts={tastePosts} />}
    </>
  );
};
export default PersonalTasteSection;
