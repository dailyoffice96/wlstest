import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import SignupPage from "../pages/SignupPage.tsx";
import SignupTermsPage from "../pages/SignupTermsPage.tsx";
import SignupCompletePage from "../pages/SignupCompletePage.tsx";
import MyPage from "../pages/MyPage.tsx";
import LearningPage from "../pages/LearningPage.tsx";
import FavoritePage from "../pages/FavoritePage.tsx";
import LecturePage from "../pages/LecturePage.tsx";
import LectureInsertForm from "../pages/LectureInsertForm.tsx";
import LectureUpdateForm from "../pages/LectureUpdateForm.tsx";
import PublicLayout from "../components/layout/PublicLayout.tsx";
import ProtectedLayout from "../components/layout/ProtectedLayout.tsx";
import Introduce from "../pages/Introduce.tsx";
import NoticeContents from "../pages/NoticeContents.tsx";
import type { User } from "../types/User.ts";
import HowToUse from "../pages/HowToUse.tsx";
import AdminPage from "../pages/AdminPage.tsx";
import PasswordlessSetting from "../components/passwordless/PasswordlessSetting.tsx";
import PasswordlessAuth from "../components/passwordless/PasswordlessAuth.tsx";

interface AppProps {
    user: User | null;
    handleLoginSuccess: (userData: User) => void;
    handleLogout: (event: React.MouseEvent<HTMLElement>) => void;
}

function AppRoutes({ user, handleLoginSuccess, handleLogout }: AppProps) {
    return (
        <Routes>
            <Route element={<PublicLayout user={user} handleLogout={handleLogout} />}>
                {/* 공개 페이지 */}
                <Route path="/" element={<Home />} />
                <Route path="/introduce/" element={<Introduce />} />
                <Route path="/introduce/howtouse" element={<HowToUse />} />
                <Route path="/api/notices" element={<NoticeContents user={user} />} />

                {/* 로그인 / 회원가입 */}
                <Route
                    path="/api/members/login"
//                     element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
                    element={<LoginPage />}
                />
                <Route path="/api/members/login/passwordlessSetting" element={<PasswordlessSetting />} />
                <Route path="/api/members/login/passwordlessAuth" element={<PasswordlessAuth />} />
                <Route path="/api/members/signup" element={<SignupPage />} />
                <Route path="/signup/terms" element={<SignupTermsPage />} />
                <Route path="/signup/complete" element={<SignupCompletePage />} />

                {/* 로그인 필요 페이지 */}
                <Route element={<ProtectedLayout user={user} />}>
                    <Route path="/api/members/mypage" element={<MyPage />} />
                    <Route path="/members/mypage/favorite" element={<FavoritePage />}/>
                    <Route path="/members/mypage/learning" element={<LearningPage />}/>
                    <Route path="/members/mypage/adminpage" element={<AdminPage />}/>
                    <Route path="/api/lecture/list" element={<LecturePage user={user} />}/>
                    <Route path="/api/lecture/insert" element={<LectureInsertForm user={user} />}/>
                    <Route path="/api/lecture/update/:id" element={<LectureUpdateForm user={user} />}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;