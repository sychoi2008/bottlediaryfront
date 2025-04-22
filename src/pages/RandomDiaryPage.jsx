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
    console.log("コメント保存：", comment);
    setComment("");

    api
      .post("/bottlediary/todaycomment", {
        content: comment,
        diaryId: diaryId,
      })
      .then((res) => {
        alert("コメントボトルを送りました");
        // replace 추가
        navigate("/write-todaydiary", { replace: true });
      })
      .catch((error) => {
        alert("コメントボトルが空です。ぜひメッセージを入れてください");
      });
  };

  if (!diary) {
    return <div className="container">読み込み中...</div>;
  }

  return (
    <div className="container">
      <div className="diary-container">
        <h2 className="diary-header">匿名の読者様の両手に</h2>
        <div className="diary-content">{diary.content}</div>
        <div className="comment-section">
          <textarea
            className="comment-input"
            placeholder="コメントを残してください..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="save-button" onClick={handleCommentSubmit}>
            コメントを保存する
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomDiaryPage;
