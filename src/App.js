import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmotionSelectPage from "./pages/EmotionSelectPage";
import RandomDiaryPage from "./pages/RandomDiaryPage";
import WriteDiaryPage from "./pages/WriteDiaryPage";
import MyDiaryPage from "./pages/MyDiaryPage";
import MyDiaryList from "./pages/MyDiaryList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emotionselect" element={<EmotionSelectPage />} />
        <Route path="/random-diary" element={<RandomDiaryPage />} />
        <Route path="/write-todaydiary" element={<WriteDiaryPage />} />
        <Route path="/my-diarylist" element={<MyDiaryList />} />
        <Route path="/my-diary/:id" element={<MyDiaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
