import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyDiaryList.css";
import CryptoJS from "crypto-js";
import api from "../utils/api";

const MyDiaryList = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      fetchDiaries();
    }
  }, [userId, currentPage]);

  const fetchDiaries = (uid = userId) => {
    api
      .post(
        `/bottlediary/mydiary?page=${currentPage}&size=5`,
        { userId: uid },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        setDiaries(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("日記リストの取得に失敗しました:", error);
        alert("もう一度ログインしてください。");
      });
  };

  const handleLogin = () => {
    if (!id.trim() || !password.trim()) {
      alert("IDとパスワードを両方入力してください。");
      return; // 함수 종료
    }

    const hash = CryptoJS.SHA256(id + password).toString(CryptoJS.enc.Hex);
    localStorage.setItem("userId", hash);
    setUserId(hash);
    setIsLoggedIn(true);
    fetchDiaries(hash);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDiaryClick = (diaryId) => {
    navigate(`/my-diary/${diaryId}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userId");
  };

  const goHome = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userId");
    navigate("/", { replace: true });
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <div className="diary-container">
          <h1 className="title">私のガラス瓶コレクション🫙</h1>
          <div className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="id">
                IDを入力してください。
              </label>
              <input
                id="id"
                value={id}
                className="form-input"
                onChange={(e) => setId(e.target.value)}
              />
              <label className="form-label" htmlFor="password">
                パスワードを入力してください。
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="submit-button" onClick={handleLogin}>
              確認する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="diary-container">
        <h1 className="title">私のガラス瓶シェルフ✨</h1>
        <div className="diary-list">
          {diaries.map((diary) => (
            <div
              key={diary.id}
              className="diary-item"
              onClick={() => handleDiaryClick(diary.id)}
            >
              <div>{diary.id}</div>
              <div className="diary-title">{diary.title}</div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-button ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          別のIDでガラス瓶を探す
        </button>
        <button className="logout-button" onClick={goHome}>
          ホームに戻る
        </button>
      </div>
    </div>
  );
};

export default MyDiaryList;
