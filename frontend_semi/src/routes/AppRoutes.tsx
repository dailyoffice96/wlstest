import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import NoticePage from "../components/notice/NoticePage";
import LoginPage from "../components/notice/LoginPage";

import CompanyIntro2 from "../Pages/CompanyIntro2";
import CompanyIntro3 from "../Pages/CompanyIntro3";
import CompanyIntro4 from "../Pages/CompanyIntro4";
import HowToUse1 from "../Pages/HowToUse1";
import HowToUse2 from "../Pages/HowToUse2";
import HowToUse3 from "../Pages/HowToUse3";
import Teacher1 from "../Pages/Teacher1";
import Teacher2 from "../Pages/Teacher2";



function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

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

              {/* 교사 관련 페이지 */}
              <Route path="/teacher/1" element={<Teacher1 />} />
              <Route path="/teacher/2" element={<Teacher2 />} />

    </Routes>
  );
}

export default AppRoutes;