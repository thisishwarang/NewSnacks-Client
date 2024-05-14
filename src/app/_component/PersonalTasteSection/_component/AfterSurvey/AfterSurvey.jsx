import SurveyPost from "@/app/(NotMainPage)/mypage/_component/TastePosts/SurveyPost/SurveyPost";
import styles from "./AfterSurvey.module.css";

const AfterSurvey = ({ tastePosts }) => {
  return (
    <div className={styles.afterSurvey}>
      <section className={styles.leftSection}>
        <div className={styles.leftBox}>
          <div className={styles.hashtag}>#뉴스낵스#취향저격</div>
          <div className={styles.firstText}>
            <strong>가치있는 삶</strong>을 위한
          </div>
          <img src={"/로고.png"} alt="logo" />
          <div className={styles.text}>
            세상에는 당신의 관심이 필요한 일들이 참 많죠. <br />
            여기 당신에게만 공개하는 뉴스를 드립니다. <br />
            즐거운 스낵타임 되시기를!
          </div>
        </div>
      </section>
      <section className={styles.rightSection}>
        <div className={styles.rightBox}>
          {tastePosts.map((tastePost, i) => (
              <SurveyPost key={i} tastePost={tastePost} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AfterSurvey;
