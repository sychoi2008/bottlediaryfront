import "../css/HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <p className="home-message">
        海辺を歩いていたあなたは、手紙が入った7つのガラス瓶を見つけました。
        今日の気分に合わせてガラス瓶を選んでみてください。✨
      </p>
      <button
        onClick={() => navigate("/emotionselect")}
        className="pick-bottle-button"
      >
        ガラス瓶を拾う🫙
      </button>
    </div>
  );
};

export default HomePage;
