"use client";
import { useEffect, useState } from "react";
import styles from "./CommentContainer.module.css";
import DebateCommentSort from "../DebateCommentSort/DebateCommentSort";
import axios from "axios";

export default function CommentContainer({ debateInfo }) {
  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState("RECENT");
  const [nowComment, setNowComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  const getDebateComments = async () => {
    try {
      const response = await axios.get(
        `https://dev.jaeyun.shop/v1/debates/${debateInfo.debateId}/comments?order=${sortOrder}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`,
          },
        }
      );
      console.log("댓글조회", response.data.data);
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (debateInfo) {
      getDebateComments();
    }
  }, [sortOrder]);

  const handleTextareaChange = (e) => {
    setNowComment(e.target.value);
  };

  const handleAddComment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      const shouldLogin = window.confirm(
        "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (shouldLogin) {
        window.location.href = KAKAO_AUTH_URL;
      }
      return;
    }
    if (nowComment.trim().length === 0) {
      alert("올바른 형식으로 댓글을 작성해주세욧!");
      return;
    }
    try {
      const response = await axios.post(
        `https://dev.jaeyun.shop/v1/debates/${debateInfo.debateId}/comments`,
        {
          content: nowComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`,
          },
        }
      );
      console.log(response);
      getDebateComments();
      setNowComment("");
    } catch (error) {
      console.log("댓글 등록 에러", error);
    }
  };
  const handleEditBtnClick = (commentId, commentContent) => {
    setEditingCommentId(commentId);
    setEditedComment(commentContent);
  };
  const handleUpdateBtnClick = async (commentId) => {};
  const handleCommentDelete = async (commentId) => {};
  const handleCommentLike = async (commentId) => {};
  const handleCommentLikeDelete = async (commentId) => {};
  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };
  return (
    <section className={styles.commentSection}>
      <div className={styles.commentContainer}>
        <div className={styles.addCommentBox}>
          <textarea
            placeholder="이번주 팝콘 토론에 대한 당신의 의견을 알려주세요."
            onChange={handleTextareaChange}
            value={nowComment}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddComment}>등록</button>
        </div>
        <DebateCommentSort sortOrder={sortOrder} onSortChange={setSortOrder} />
        <div className={styles.commentsBox}>
          <ul>
            {comments.map((comment, i) => (
              <li key={i} className={styles.commentLi}>
                <div className={styles.userInfo}>
                  <img src={"/댓글프로필.svg"} alt="profileimg" />
                  <span className={styles.nickname}>{comment.writerName}</span>
                  <span className={styles.voteResult}>
                    ({comment.vote ? "찬성" : "반대"})
                  </span>
                </div>
                {editingCommentId === comment.id ? (
                  <div className={styles.editBox}>
                    <textarea
                      className={styles.editTextarea}
                      value={editedComment}
                      // autoFocus
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <button
                      className={styles.editComplete}
                      onClick={() => handleUpdateBtnClick(comment.id)}
                    >
                      수정완료
                    </button>
                  </div>
                ) : (
                  <>
                    <p className={styles.commentContent}>{comment.content}</p>
                    <div className={styles.commentLikeBtnDiv}>
                      {comment.isMyComment ? (
                        <div className={styles.updateAndDelete}>
                          <button
                            onClick={() =>
                              handleEditBtnClick(comment.id, comment.content)
                            }
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleCommentDelete(comment.id)}
                          >
                            삭제
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={styles.likeBox}>
                        {comment.isLikedByMe ? (
                          <button
                            className={styles.commentLikeBtn}
                            onClick={() => handleCommentLikeDelete(comment.id)}
                          >
                            <img
                              src={"/좋아요-after.svg"}
                              alt="commentLikeBtn"
                            />
                          </button>
                        ) : (
                          <button
                            className={styles.commentLikeBtn}
                            onClick={() => handleCommentLike(comment.id)}
                          >
                            <img
                              src={"/좋아요-before.svg"}
                              alt="commentLikeBtn"
                            />
                          </button>
                        )}

                        <span className={styles.likeCount}>
                          {comment.likeCount}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}