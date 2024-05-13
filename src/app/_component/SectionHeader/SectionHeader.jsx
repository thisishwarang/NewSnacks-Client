import styles from "./SectionHeader.module.css";
 const SectionHeader =(props) => {
  return (
    <header className={styles.header}>
      <span>{props.span}</span>
      <div
        style={{ width: `${props.lineWidth}rem` }}
        className={styles.line}
      ></div>
      <div>
        <img src={"/팝콘.png"} alt="popcorn" className={styles.popcorn} />
      </div>
    </header>
  );
}

export default SectionHeader