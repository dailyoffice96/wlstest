import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import "./components/layout/Header.css";


function App() {
  const isLogin = true;
  const userName = "KOTCHA";

  return (
  <>
    <Header isLogin={isLogin} username={userName} />

    <div className="page-layout">
      <Sidebar />

      <main className="main-content">
        {/* 본문 영역 */}
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