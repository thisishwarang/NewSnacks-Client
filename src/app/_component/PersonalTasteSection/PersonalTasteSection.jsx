"use client";
import AfterSurvey from "./_component/AfterSurvey/AfterSurvey";
import BeforeSurvey from "./_component/BeforeSurvey/BeforeSurvey";

export default function PersonalTasteSection() {
  const surveyResult = false;
  return <>{!surveyResult ? <BeforeSurvey /> : <AfterSurvey />}</>;
}
