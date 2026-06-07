import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "../pages/Home.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import SignupPage from "../pages/SignupPage.tsx";
import SignupTermsPage from "../pages/SignupTermsPage.tsx";
import SignupCompletePage from "../pages/SignupCompletePage.tsx";
import MyPage from "../pages/MyPage.tsx";
import LearningPage from "../pages/LearningPage.tsx";
import FavoritePage from "../pages/FavoritePage.tsx";
import LecturePage from "../pages/LecturePage"
import LectureInsertForm from "../pages/LectureInsertForm"
import LectureUpdateForm from "../pages/LectureUpdateForm"
import PublicLayout from "../components/layout/PublicLayout.tsx";
import Introduce from "../pages/Introduce.tsx";
import NoticeContents from "../pages/NoticeContents.tsx";

function AppRoutes() {

    return (
        <Routes>
            <Route path="/lecture/list" element={
                <PublicLayout isLogin={isLogin}
                              username={userName}
                              onLogout={handleLogout}>
                    <LecturePage/>
                </PublicLayout>
            }
            />
           <Route path="/introduce/" element={
                <PublicLayout isLogin={isLogin}
                              username={userName}
                              onLogout={handleLogout}>
                    <Introduce/>
                </PublicLayout>
            }
            />

            <Route path="/lecture/insert" element={
                    <PublicLayout isLogin={isLogin}
                                  username={userName}
                                  onLogout={handleLogout}>
                                  <LectureInsertForm/>
                    </PublicLayout>
            }/>
            <Route path="/lecture/update/:id"  element={
                    <PublicLayout isLogin={isLogin}
                                  username={userName}
                                  onLogout={handleLogout}>
                                  <LectureUpdateForm/>
                    </PublicLayout>
            }/>
            <Route
                path="/"
                element={
                    <PublicLayout isLogin={isLogin}
                                  username={userName}
                                  onLogout={handleLogout}>
                        <Home/>
                    </PublicLayout>
                }
            />
            <Route
                path="/login"
                element={
                    <PublicLayout isLogin={isLogin}
                                  username={userName}
                                  onLogout={handleLogout}>
                        <LoginPage onLoginSuccess={handleLoginSuccess}/>
                    </PublicLayout>
                }
            />
            <Route
                path="/signup"
                element={
                    <PublicLayout isLogin={isLogin}
                                  username={userName}>
                        <SignupPage/>
                    </PublicLayout>
                }
            />
            <Route
                path="/signup/terms"
                element={
                    <PublicLayout isLogin={isLogin}
                                  username={userName}>
                        <SignupTermsPage/>
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
                        <SignupCompletePage/>
                    </PublicLayout>
                }/>
            <Route
                path="/memberinfo/mypage/"
                element={
                    <PublicLayout
                        isLogin={isLogin}
                        username={userName}
                        onLogout={handleLogout}>
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
                        <LearningPage/>
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
                <Route
                path="/notices/"
                element={
                    <PublicLayout
                        isLogin={isLogin}
                        username={userName}
                        onLogout={handleLogout}>
                        <NoticeContents />
                    </PublicLayout>
                }/>
        </Routes>
    );
}

export default AppRoutes;