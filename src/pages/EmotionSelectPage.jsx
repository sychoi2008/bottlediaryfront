import { useNavigate } from "react-router-dom";
import "../css/EmotionSelectPage.css";
import { useEffect, useState } from "react";
import api from "../utils/api";

const EmotionSelectPage = () => {
  const navigate = useNavigate();
  const [emotions, setEmotions] = useState([]);
  const description = [
    "감사, 만족, 성취감",
    "피로, 무기력, 번아웃",
    "우울, 상실감, 외로움",
    "분노, 짜증, 답답함",
    "불안, 당황, 갈등",
    "공허, 무관심, 지루함",
    "호기심, 실험, 새로운 시작",
  ];

  const handleEmotionClick = (emotionId) => {
    // replace 추가가
    navigate(`/random-diary?emotion=${emotionId}`);
  };

  useEffect(() => {
    api.get("/bottlediary/emotions").then((res) => {
      setEmotions(res.data.results);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="title">오늘의 감정을 선택해주세요</h1>
      <div className="emotion-grid">
        {emotions.map((emotion) => (
          <button
            key={emotion.emotionId}
            className="emotion-button"
            onClick={() => handleEmotionClick(emotion.emotionId)}
          >
            <span className="emotion-name">{emotion.emotionName}</span>
            <span className="emotion-description">
              ({description[emotion.emotionId - 1]})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelectPage;
