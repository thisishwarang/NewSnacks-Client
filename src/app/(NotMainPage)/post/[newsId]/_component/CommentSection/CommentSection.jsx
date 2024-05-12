"use client";
import { useEffect, useState } from "react";
import styles from "./CommentSection.module.css";
import axios from "axios";
import CommentSort from "../CommentSort/CommentSort";

export default function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState("RECENT");
  const [nowComment, setNowComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [textareaCount, setTextareaCount] = useState(0);
  const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  useEffect(() => {
    if (articleId) {
      getComments();
    }
  }, [articleId, sortOrder]);
  const getComments = async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `https://dev.jaeyun.shop/v1/articles/${articleId}/comments?order=${sortOrder}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("댓글조회", response);
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //사용자 입력 받아오기
  const handleTextareaChange = (e) => {
    setNowComment(e.target.value);
    setTextareaCount(e.target.value.length);
  };
  //댓글 추가
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
        `https://dev.jaeyun.shop/v1/articles/${articleId}/comments`,
        {
          content: nowComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      getComments();
      setNowComment("");
      setTextareaCount(0);
    } catch (error) {
      console.log("댓글 등록 에러", error);
    }
  };
  //댓글 수정버튼 클릭
  const handleEditBtnClick = (commentId, commentContent) => {
    setEditingCommentId(commentId);
    setEditedComment(commentContent);
  };
  //댓글 수정완료
  const handleUpdateBtnClick = async (commentId) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `https://dev.jaeyun.shop/v1/comments/${commentId}`,
        {
          content: editedComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      getComments();
    } catch (error) {
      console.log("댓글수정에러", error);
    }
    setEditingCommentId(null);
    setEditedComment("");
  };
  //댓글 삭제
  const handleCommentDelete = async (commentId) => {
    let accessToken = localStorage.getItem("accessToken");
    const deleteCheck = window.confirm("정말 삭제하시겠습니까?");
    if (deleteCheck) {
      try {
        const response = await axios.delete(
          `https://dev.jaeyun.shop/v1/comments/${commentId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);
        getComments();
      } catch (error) {
        console.log("댓글삭제에러", error);
      }
    }
  };
  //댓글 좋아요
  const handleCommentLike = async (commentId) => {
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
    try {
      const response = await axios.post(
        `https://dev.jaeyun.shop/v1/comments/${commentId}/likes`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      getComments();
    } catch (error) {
      console.log("댓글 좋아요 에러", error);
    }
  };
  //댓글 좋아요 취소
  const handleCommentLikeDelete = async (commentId) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `https://dev.jaeyun.shop/v1/comments/${commentId}/likes`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      getComments();
    } catch (error) {
      console.log("댓글 좋아요 취소 에러", error);
    }
  };
  //한글입력 후 엔터키 눌렀을때 이벤트 두번 발생하는 버그 수정
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
          <div className={styles.textareaBox}>
            <textarea
              placeholder="당신의 의견을 알려주세요."
              onChange={handleTextareaChange}
              value={nowComment}
              // onKeyUp={enterkey}
              onKeyDown={handleKeyDown}
              maxLength={200}
            />
            <p>
              <span>{textareaCount}</span>
              <span>/200 자</span>
            </p>
          </div>

          <button onClick={handleAddComment}>등록</button>
        </div>
        <CommentSort sortOrder={sortOrder} onSortChange={setSortOrder} />
        <div className={styles.commentsBox}>
          <ul>
            {comments.map((comment, i) => (
              <li key={i} className={styles.commentLi}>
                <div className={styles.userInfo}>
                  <img src={"/댓글프로필.svg"} alt="profileimg" />
                  <span className={styles.nickname}>{comment.writerName}</span>
                  <span className={styles.createdAt}>
                    {comment.createdAt ? comment.createdAt.split("T")[0] : ""}
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
                        <div></div>
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
