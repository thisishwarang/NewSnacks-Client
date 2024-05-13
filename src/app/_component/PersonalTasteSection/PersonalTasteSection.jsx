"use client";
import AfterSurvey from "./_component/AfterSurvey/AfterSurvey";
import BeforeSurvey from "./_component/BeforeSurvey/BeforeSurvey";

 const PersonalTasteSection = () => {
  const surveyResult = false;
  return <>{!surveyResult ? <BeforeSurvey /> : <AfterSurvey />}</>;
}
export default PersonalTasteSection