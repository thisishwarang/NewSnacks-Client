import styles from "./CommentSort.module.css";

const CommentSort = ({ sortOrder, onSortChange }) => {
  return (
    <div className={styles.sortingBox}>
      <button
        className={sortOrder === "RECENT" ? styles.selectedBtn : ""}
        onClick={() => {
          onSortChange("RECENT");
        }}
      >
        최신순
      </button>
      <button
        className={sortOrder === "POPULAR" ? styles.selectedBtn : ""}
        onClick={() => {
          onSortChange("POPULAR");
        }}
      >
        좋아요순
      </button>
    </div>
  );
};
export default CommentSort;
