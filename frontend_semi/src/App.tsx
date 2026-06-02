import Header from "./components/layout/Header";
import "./components/layout/Header.css";
import AppRoutes from "./routes/AppRoutes"

function App() {
  const isLogin = true;
  const userName = "KOTCHA";

  return (
    <>
      <Header isLogin={isLogin} username={userName} />

      <AppRoutes />

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