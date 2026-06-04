import AppRoutes from "./routes/AppRoutes";
import "./components/layout/Header.css";

function App() {
  return (
    <>
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