import "./App.css";
import "./components/layout/Header.css";

import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import MainLayout from "./components/layout/MainLayout";

import LoginPage from "./pages/LoginPage"; 
import Home from "./pages/Home";


function App() {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
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
        const logoutmessage = window.confirm("로그아웃 하시겠습니까?");
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