import styles from "./AfterSurvey.module.css";

export default function AfterSurvey() {
  return (
    <div className={styles.afterSurvey}>
      <section className={styles.leftSection}>
        <div className={styles.leftBox}>
          <div className={styles.hashtag}>#뉴스낵스#취향저격</div>
          <div className={styles.firstText}>
            <strong>가치있는 삶</strong>을 위한
          </div>
          <img src={"/로고.png"} alt="logo" />
          <p>
            세상에는 당신의 관심이 필요한 일들이 참 많죠. <br />
            여기 당신에게만 공개하는 뉴스를 드립니다. <br />
            즐거운 스낵타임 되시기를!
          </p>
        </div>
      </section>
      <section className={styles.rightSection}>
        <div className={styles.rightBox}>
          <SurveyPost
            hashtag={"#홍콩"}
            imgSrc={"pImg1.png"}
            alt={"img1"}
            text={"홍콩의 새 안전법, 수십 년이 걸린 이유"}
          />
          <SurveyPost
            hashtag={"#기후위기"}
            imgSrc={"/pImg2.png"}
            alt={"img2"}
            text={"지구의 온도를 내릴 수 있는 최선의 방법"}
          />
          <SurveyPost
            hashtag={"#아동"}
            imgSrc={"/pImg3.png"}
            alt={"img3"}
            text={"인터넷은 황무지, 어린이를 위한 더 좋은 공간이 필요하다"}
          />
        </div>
      </section>
    </div>
  );
}

function SurveyPost({ hashtag, imgSrc, alt, text }) {
  return (
    <div className={styles.post}>
      <div className={styles.postHashtag}>{hashtag}</div>
      <img className={styles.postImg} src={imgSrc} alt={alt} />
      <div className={styles.postText}>{text}</div>
    </div>
  );
}
