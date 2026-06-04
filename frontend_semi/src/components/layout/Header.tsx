import { useNavigate } from "react-router-dom";
import logo from "../../icon/logo.svg";

type HeaderProps = {
  isLogin: boolean;
  username?: string;
  onLogout?: () => void;
};

function Header({ isLogin, username, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="header">
    <div className="header-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="풀스택 강의실 로고" />
    </div>

      <div className="header-left">
        <div className="custom-dropdown">
          <button className="header-button">소개 ▾</button>

          <div className="custom-dropdown-menu">
            <div className="custom-dropdown-item" onClick={()=> navigate("/introduce/")}>사이트 소개</div>
            <div className="custom-dropdown-item">이용 방법</div>
          </div>
        </div>

        {isLogin && (
          <>
            <button className="header-button" onClick={()=>navigate("/lecture/list/")}>▣ 강의실</button>
            <button className="header-button">▤ 공지사항</button>
          </>
        )}
      </div>


      <div className="header-right">
        {isLogin ? (
          <><button className="header-button" onClick={()=>navigate("/memberinfo/mypage/favorite/")}> ★ 즐겨찾기</button>
            <button className="header-button" onClick={()=>navigate("/memberinfo/mypage/")}>♙ {username}</button>
            <button className="header-button" onClick={onLogout}>
              ↪로그아웃
            </button>
          </>
        ) : (
          <>
            <button className="header-button" onClick={() => navigate("/login")}>
              LOGIN
            </button>
            <button
              className="header-button"
              onClick={() => navigate("/signup/terms")}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;