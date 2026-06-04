import "./App.css";
import "./components/layout/Header.css";

import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import SignupTermsPage from "./pages/SignupTermsPage";
import SignupCompletePage from "./pages/SignupCompletePage";
import MyPage from "./pages/MyPage";
import LearningPage from "./pages/LearningPage";
import FavoritePage from "./pages/FavoritePage";


function App() {
    const navigate = useNavigate(); // 내비게이트 선언해둬야 해당 기능 사용 가능.
    const [userName, setUserName] = useState(
      localStorage.getItem("name") || ""
    );

    const[isLogin, setIsLogin] = useState(
        localStorage.getItem("accessToken") !== null
    );

    const handleLoginSuccess = (name: string) => {
      setIsLogin(true);
      setUserName(name);
      navigate("/");
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("memberId");
        localStorage.removeItem("name");
        const logoutmessage = window.confirm("로그아웃 하시겠습니까?"); // 여기에 넣어야 함수가 작동할때만 메시지를 출력하게됨.
        if(!logoutmessage){
          return;
        }

        alert("로그아웃 되었습니다.");
        setIsLogin(false);
        setUserName("");

        navigate("/");
    };

  return (
       <Routes>
        <Route
               path="/"
               element={
                  <PublicLayout isLogin={isLogin}
                                username={userName}
                                onLogout={handleLogout}>
                                  <Home />
                    </PublicLayout>
               }
              />
              <Route
               path="/login"
               element={
                  <PublicLayout isLogin={isLogin}
                                username={userName}
                                onLogout={handleLogout}>
                                  <LoginPage onLoginSuccess={handleLoginSuccess} />
                    </PublicLayout>
               }
              />
              <Route
               path="/signup"
               element={
                  <PublicLayout isLogin={isLogin}
                                username={userName}>
                                <SignupPage />
                                </PublicLayout>
               }
              />
              <Route
               path="/signup/terms"
               element={
                  <PublicLayout isLogin={isLogin}
                                username={userName}>
                                <SignupTermsPage />
                                </PublicLayout>
               }
              />
              <Route
                 path="/signup/complete"
                 element={
               <PublicLayout
                       isLogin={isLogin}
                       username={userName}
                       onLogout={handleLogout}
                                              >
                   <SignupCompletePage />
               </PublicLayout>
              }/>
            <Route
                 path="/memberinfo/mypage/"
                 element={
               <PublicLayout
                       isLogin={isLogin}
                       username={userName}
                       onLogout={handleLogout} >
                   <MyPage />
               </PublicLayout>
              }/>
              <Route
                 path="/memberinfo/mypage/learning/"
                 element={
               <PublicLayout
                       isLogin={isLogin}
                       username={userName}
                       onLogout={handleLogout}>
                   <LearningPage />
               </PublicLayout>
              }/>
              <Route
                 path="/memberinfo/mypage/favorite/"
                 element={
               <PublicLayout
                       isLogin={isLogin}
                       username={userName}
                       onLogout={handleLogout}>
                   <FavoritePage />
               </PublicLayout>
              }/>
       </Routes>
  );
}

export default App;

{/*
  페이지별 변동주기
    <aside className="sidebar">
      <div className="sidebar-dom sidebar-dom1">{dom1}</div>
      <div className="sidebar-dom sidebar-dom2">{dom2}</div>
      <div className="sidebar-dom sidebar-dom3">{dom3}</div>
    </aside>
*/}