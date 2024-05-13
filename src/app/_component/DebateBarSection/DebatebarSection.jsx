"use client";
import React, { useEffect, useState } from "react";
import DebateBar from "../DebateBar/DebateBar";
import styles from "./DebatebarSection.module.css";

 const DebatebarSection = ({ agreeCount, disagreeCount }) => {
  const [forVotes, setForVotes] = useState(0);
  const [againstVotes, setAgainstVotes] = useState(0);
  useEffect(() => {
    setForVotes(agreeCount);
    setAgainstVotes(disagreeCount);
  }, [agreeCount, disagreeCount]);

  return (
    <>
      <DebateBar forVotes={forVotes} againstVotes={againstVotes} />
      <div className={styles.voteCount}>
        <span>{forVotes} 팝콘</span>
        <span>{againstVotes} 팝콘</span>
      </div>
    </>
  );
}
export default DebatebarSection
