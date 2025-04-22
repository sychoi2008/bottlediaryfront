import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/WriteDiaryPage.css";
import api from "../utils/api";

const WriteDiaryPage = () => {
  const navigate = useNavigate();
  const [emotions, setEmotions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    emotionId: "",
    userId: "",
    password: "",
  });

  useEffect(() => {
    api.get("/bottlediary/emotions").then((res) => {
      setEmotions(res.data.results);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/bottlediary/todaydiary", formData)
      .then((res) => {
        alert("ガラス瓶を海に流しました。");
        navigate("/my-diarylist", { replace: true });
      })
      .catch((error) => {
        alert("ガラス瓶にひびが入り、失敗しました。");
      });
  };

  return (
    <div className="container">
      <div className="diary-container">
        <h1 className="title">今日のガラス瓶を送ってみましょう。</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="emotionId">
              今日の感情
            </label>
            <select
              id="emotionId"
              name="emotionId"
              className="form-input emotion-select"
              value={formData.emotionId}
              onChange={handleChange}
              required
            >
              <option value="">感情を選んでください</option>
              {emotions.map((emotion) => (
                <option key={emotion.emotionId} value={emotion.emotionId}>
                  {emotion.emotionName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="content">
              日記の内容
            </label>
            <textarea
              id="content"
              name="content"
              className="form-input diary-content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="credentials-section">
            <div className="form-group">
              <label className="form-label" htmlFor="userId">
                ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                className="form-input"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            日記を保存する
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteDiaryPage;
