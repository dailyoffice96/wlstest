import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AppRoutes from "./routes/AppRoutes"; // 라우팅은 분리
import "./components/layout/Header.css";
import "./App.css";

function App() {
  const isLogin = true;
  const userName = "KOTCHA";

  return (
    <>
      <Header isLogin={isLogin} username={userName} />

      <div className="page-layout">
        <Sidebar /> {/* 팀원의 사이드바 유지 */}

        <main className="main-content">
          <AppRoutes /> {/* 여기서 라우팅된 페이지들이 보여짐 */}
        </main>
      </div>
    </>
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