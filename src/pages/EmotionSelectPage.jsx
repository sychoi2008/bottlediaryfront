import { useNavigate } from "react-router-dom";
import "../css/EmotionSelectPage.css";
import { useEffect, useState } from "react";
import api from "../utils/api";

const EmotionSelectPage = () => {
  const navigate = useNavigate();
  const [emotions, setEmotions] = useState([]);
  const description = [
    "感謝、満足、達成感",
    "疲労、無気力、燃え尽き",
    "憂鬱、喪失感、孤独",
    "怒り、苛立ち、もどかしさ",
    "不安、戸惑い、葛藤",
    "虚無、無関心、退屈",
    "好奇心、挑戦、新しい始まり",
  ];

  const handleEmotionClick = (emotionId) => {
    // replace 추가
    navigate(`/random-diary?emotion=${emotionId}`);
  };

  useEffect(() => {
    console.log("sending request?");
    api.get("/bottlediary/emotions").then((res) => {
      setEmotions(res.data.results);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="title">今日の感情を選んでください</h1>
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
