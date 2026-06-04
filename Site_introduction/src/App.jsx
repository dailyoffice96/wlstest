import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

import "./components/layout/Header.css";
import "./components/layout/Sidebar.css";
import "./App.css";

import CompanyIntro2 from "./pages/CompanyIntro2";
import CompanyIntro3 from "./pages/CompanyIntro3";
import CompanyIntro4 from "./pages/CompanyIntro4";
import HowToUse1 from "./pages/HowToUse1";
import HowToUse2 from "./pages/HowToUse2";
import HowToUse3 from "./pages/HowToUse3";
import Teacher1 from "./pages/Teacher1";
import Teacher2 from "./pages/Teacher2";

function App() {
  const isLogin = true;
  const userName = "KOTCHA";

  return (
    <>
      <Header isLogin={isLogin} username={userName} />

      <div className="page-layout">
        <Sidebar />

        <main className="main-content">
          <section className="content-box">
            <Routes>
              <Route path="/" element={<Navigate to="/company/1" replace />} />

              <Route path="/company/1" element={<CompanyIntro2 />} />
              <Route path="/company/2" element={<CompanyIntro3 />} />
              <Route path="/company/3" element={<CompanyIntro4 />} />

              <Route path="/guide/1" element={<HowToUse1 />} />
              <Route path="/guide/2" element={<HowToUse2 />} />
              <Route path="/guide/3" element={<HowToUse3 />} />

              <Route path="/teacher/1" element={<Teacher1 />} />
              <Route path="/teacher/2" element={<Teacher2 />} />
            </Routes>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;