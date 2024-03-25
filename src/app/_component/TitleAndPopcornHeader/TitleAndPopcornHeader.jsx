import styles from "./TitleAndPopcornHeader.module.css";
export default function TitleAndPopcornHeader({ span }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title}>{span}</div>
        <div>
          <img src={"/팝콘.png"} alt="popcorn" className={styles.popcorn} />
        </div>
      </div>
    </header>
  );
}
