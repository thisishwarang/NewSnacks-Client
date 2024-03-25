import styles from "./DebateBar.module.css";

export default function DebateBar({ forVotes, againstVotes }) {
  const totalVotes = forVotes + againstVotes;

  const forRatio =
    forVotes === 0 && againstVotes === 0 ? 0.5 : forVotes / totalVotes;
  const againstRatio =
    forVotes === 0 && againstVotes === 0 ? 0.5 : againstVotes / totalVotes;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "2.7rem",
        backgroundColor: "pink",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      {/* 찬성 부분 */}
      <div
        style={{
          width: `${forRatio * 100}%`,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
        }}
      >
        <div className={styles.forVotesSpan}>찬성</div>
      </div>
      {/* 반대 부분 */}
      <div
        style={{
          width: `${againstRatio * 100}%`,
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <span className={styles.againstVotesSpan}>반대</span>
      </div>
    </div>
  );
}
