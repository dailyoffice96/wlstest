import { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Home from "../pages/Home.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import SignupPage from "../pages/SignupPage.tsx";
import SignupTermsPage from "../pages/SignupTermsPage.tsx";
import SignupCompletePage from "../pages/SignupCompletePage.tsx";
import MyPage from "../pages/LearningPage.tsx";
import LearningPage from "../pages/LearningPage.tsx";
import FavoritePage from "../pages/FavoritePage.tsx";
import LecturePage from "../pages/LecturePage"
import LectureInsertForm from "../pages/LectureInsertForm"
import LectureUpdateForm from "../pages/LectureUpdateForm"
import PublicLayout from "../components/layout/PublicLayout.tsx";

import NoticePage from "../components/notice/NoticePage";
import CompanyIntro2 from "../Pages/CompanyIntro2";
import CompanyIntro3 from "../Pages/CompanyIntro3";
import CompanyIntro4 from "../Pages/CompanyIntro4";
import HowToUse1 from "../Pages/HowToUse1";
import HowToUse2 from "../Pages/HowToUse2";
import HowToUse3 from "../Pages/HowToUse3";


function AppRoutes() {
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
            <Route path="/lecture/list" element={
                <PublicLayout isLogin={isLogin}
                              username={userName}
                              onLogout={handleLogout}>
                <LecturePage />
                </PublicLayout>
                }
                />

            <Route path="/lecture/insert" element={<LectureInsertForm />} />
            <Route path="/lecture/update/:id" element={<LectureUpdateForm />} />
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
            {/* 기본 경로 설정 */}
            <Route path="/" element={<Navigate to="/company/1" replace />} />

            {/* 공지사항 */}
            <Route path="/notice" element={<NoticePage type="all" />} />
            <Route path="/notice/important" element={<NoticePage type="important" />} />
            <Route path="/notice/update" element={<NoticePage type="update" />} />

            {/* 회사소개 및 가이드 */}
            <Route path="/company/1" element={<CompanyIntro2 />} />
            <Route path="/company/2" element={<CompanyIntro3 />} />
            <Route path="/company/3" element={<CompanyIntro4 />} />
            <Route path="/guide/1" element={<HowToUse1 />} />
            <Route path="/guide/2" element={<HowToUse2 />} />
            <Route path="/guide/3" element={<HowToUse3 />} />
        </Routes>
    );
}

export default AppRoutes;