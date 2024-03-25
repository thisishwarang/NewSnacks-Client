import AfterSurvey from "./_component/AfterSurvey/AfterSurvey";
import BeforeSurvey from "./_component/BeforeSurvey/BeforeSurvey";

export default function PersonalTasteSection({ surveyResult }) {
  return <>{!surveyResult ? <BeforeSurvey /> : <AfterSurvey />}</>;
}
