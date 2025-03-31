import "../css/HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <p className="home-message">
        바다를 걷던 당신은 편지가 들어간 유리병을 7개를 발견합니다. 오늘의
        기분에 맞게 유리병을 골라보세요.✨
      </p>
      <button
        onClick={() => navigate("/emotionselect")}
        className="pick-bottle-button"
      >
        유리병 줍기🫙
      </button>
    </div>
  );
};

export default HomePage;
