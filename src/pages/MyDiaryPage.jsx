import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/MyDiaryPage.css";
import api from "../utils/api";

const MyDiaryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("");
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    api
      .get(`/bottlediary/mydiary?diaryId=${id}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setEmotion(res.data.emotionName);
        setComments(res.data.comments || []);
      })
      .catch((error) => {
        console.error("일기를 불러오는데 실패했습니다:", error);
      });
  }, [id, userId]);

  return (
    <div className="container">
      <div className="diary-container">
        <h1 className="diary-header">{title}</h1>
        <h2 className="diary-emotion">{emotion}</h2>
        <div className="diary-content">{content}</div>

        <div className="comments-section">
          <h3 className="comments-title">댓글</h3>
          <div className="comment-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-content">{comment.content}</div>
                <div className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="back-button"
          onClick={() => navigate("/my-diarylist")}
        >
          목록으로 가기
        </button>
      </div>
    </div>
  );
};

export default MyDiaryPage;
