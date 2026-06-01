import { useNavigate } from "react-router-dom";

type HeaderProps = {
  isLogin: boolean;
  username?: string;
  onLogout?: () => void;
};

function Header({isLogin, username, onLogout}: HeaderProps) {
  const navigate = useNavigate();
    return(
<header className="header">
  <div className="header-logo" onClick={()=>navigate("/")}>백프론트 강의실</div>

    <div className="header-left">
      <div className="custom-dropdown">
        <button className="header-button" style={{marginLeft: "12px"}}>소개 ▾</button>

        <div className="custom-dropdown-menu">
            <div className="custom-dropdown-item">사이트 소개</div>
            <div className="custom-dropdown-item">이용 방법</div>
            <div className="custom-dropdown-item">선생님 소개</div>
        </div>
    </div>

  {isLogin && <button className="header-button">강의실</button>}
    </div>
  <div className="header-right">
    {isLogin ? (
      <>
        <button>☆즐겨찾기</button>
        <button>{username}님</button>
        <button onClick={onLogout}>로그아웃</button>
      </>
    ) : (
      <>
        <button onClick={()=>navigate("/login")}>Login</button>
        <button onClick={()=>navigate("/signup")}>Sign Up</button>
      </>
    )}
  </div>
</header>
    );
}

export default Header;