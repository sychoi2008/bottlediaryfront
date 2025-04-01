import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/RandomDiaryPage.css";
import api from "../utils/api";

const RandomDiaryPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emotionId = searchParams.get("emotion");
  const [diary, setDiary] = useState(null);
  const [diaryId, setDiaryId] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api.get(`/bottlediary?emotionId=${emotionId}`).then((res) => {
      console.log(res.data);
      setDiary(res.data);
      setDiaryId(res.data.id);
    });
  }, [emotionId]);

  const handleCommentSubmit = () => {
    // TODO: 댓글 저장 API 호출
    console.log("댓글 저장:", comment);
    setComment("");

    api
      .post("/bottlediary/todaycomment", {
        content: comment,
        diaryId: diaryId,
      })
      .then((res) => {
        alert("댓글 유리병을 보냈습니다");
        // replace 추가가
        navigate("/write-todaydiary", { replace: true });
      });
  };

  if (!diary) {
    return <div className="container">로딩 중...</div>;
  }

  return (
    <div className="container">
      <div className="diary-container">
        <h2 className="diary-header">익명의 독자님의 두 손에</h2>
        <div className="diary-content">{diary.content}</div>
        <div className="comment-section">
          <textarea
            className="comment-input"
            placeholder="댓글을 남겨주세요..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="save-button" onClick={handleCommentSubmit}>
            댓글 저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomDiaryPage;
