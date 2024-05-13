import Button from "./Button/Button";
import styles from "./HamburgerMenu.module.css";

const HamburgerMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navMenu}>
        <Button text={"카테고리별 뉴스"} route={"/category/all"} />
        <Button text={"대륙별 뉴스"} route={"/continent/all"} />
        <Button text={"팝콘 토론"} route={"/debate-history"} />
        <Button text={"마이페이지"} route={"/mypage"} />
      </div>
      <div className={styles.logoDiv}>
        <img src={"/로고.png"} alt="logo" className={styles.img} />
        <div className={styles.text}>간식같이 간편한 해외 뉴스</div>
      </div>
    </div>
  );
};
export default HamburgerMenu;
