import { useState, useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      fetchDiaries();
    }
  }, [userId, currentPage]);

  const fetchDiaries = () => {
    api
      .post(
        `/bottlediary/mydiary?page=${currentPage}&size=5`,
        {
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setDiaries(res.data);
        // setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("일기 목록을 불러오는데 실패했습니다:", error);
      });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchDiaries();
    const hash = CryptoJS.SHA256(id + password).toString(CryptoJS.enc.Hex);
    localStorage.setItem("userId", hash);
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
          <h1 className="title">나의 유리병 모음🫙</h1>
          <div className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="id">
                아이디를 입력해주세요
              </label>
              <input
                id="id"
                value={id}
                className="form-input"
                onChange={(e) => setId(e.target.value)}
              />
              <label className="form-label" htmlFor="password">
                비밀번호를 입력해주세요
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
              확인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="diary-container">
        <h1 className="title">나의 유리병 선반✨</h1>
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
          다른 아이디로 유리병 찾기
        </button>
        <button className="logout-button" onClick={goHome}>
          홈으로 가기
        </button>
      </div>
    </div>
  );
};

export default MyDiaryList;
