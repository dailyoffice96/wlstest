import { Route, Routes } from "react-router-dom";

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
import type { User } from "../types/User.ts";
import HowToUse from "../pages/HowToUse.tsx";

interface AppProps { // App.tsx에서 온 프롭스 - LoginPage.tsx에 전달만 함
    user: User | null; // 로그인하면 App.tsx의 setUser로 의미있는 데이터가 되어 프롭스로 받아짐 (로그인안하면 null)
    handleLoginSuccess: (userData: User) => void;
    handleLogout: (event: React.MouseEvent<HTMLElement>) => void;
}

function AppRoutes({ user, handleLoginSuccess, handleLogout }: AppProps) {

    return (
        <Routes>
            {/* Header 있는 그룹 */}
            <Route element={<PublicLayout user={user} handleLogout={handleLogout} />}>
                <Route path="/lecture/list" element={<LecturePage />} />
                <Route path="/introduce/" element={<Introduce />} />
                <Route path="/introduce/howtouse" element={<HowToUse />} />
                <Route path="/lecture/insert" element={<LectureInsertForm />} />
                <Route path="/lecture/update/:id" element={<LectureUpdateForm />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage handleLoginSuccess={handleLoginSuccess} />} />

                <Route path="/signup" element={<SignupPage />} />

                <Route path="/signup/terms" element={<SignupTermsPage />} />



                <Route path="/signup/complete" element={<SignupCompletePage />} />

                <Route path="/memberinfo/mypage/" element={<MyPage />} />

                <Route path="/memberinfo/mypage/learning/" element={<LearningPage />} />


                <Route path="/memberinfo/mypage/favorite/" element={<FavoritePage />} />

                <Route path="/notices/" element={<NoticeContents />} />

            </Route>

        </Routes>
    );
}

export default AppRoutes;