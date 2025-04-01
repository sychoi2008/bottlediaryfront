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
        alert("유리병을 바다에 흘려보냈습니다.");
        navigate("/my-diarylist", { replace: true });
      })
      .catch((error) => {
        alert("유리병에 균열이 있어 실패했습니다.");
      });
  };

  return (
    <div className="container">
      <div className="diary-container">
        <h1 className="title">오늘의 유리병을 보내봅시다</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              제목
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
              오늘의 감정
            </label>
            <select
              id="emotionId"
              name="emotionId"
              className="form-input emotion-select"
              value={formData.emotionId}
              onChange={handleChange}
              required
            >
              <option value="">감정을 선택해주세요</option>
              {emotions.map((emotion) => (
                <option key={emotion.emotionId} value={emotion.emotionId}>
                  {emotion.emotionName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="content">
              일기 내용
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
                아이디
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
                비밀번호
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
            일기 저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteDiaryPage;
