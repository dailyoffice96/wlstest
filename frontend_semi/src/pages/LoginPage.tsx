import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import "./LoginPage.css";

type LoginPageProps = {
    onLoginSuccess: (name: string) => void;
}

function LoginPage({onLoginSuccess}: LoginPageProps){    
    const navigate =useNavigate();
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
       try{
        const response = await axios.post(`${API_BASE_URL}/api/members/login`,{
            loginId: loginId,
            password: password,
        },
    {
        headers:{
            "Content-Type": "application/json",
        },
    });
        console.log("로그인 성공 응답 ", response.data);
        
        // 로그인 성 시 토큰과 회원번호, 이름을 사용자 저장소에 저장함.

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("memberId", String(response.data.memberId));
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("role", response.data.role);

        onLoginSuccess(response.data.name);
        navigate("/");

        alert("로그인 성공");
       } catch(error){
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다.");
       }
    };

return(
    <div className="login-page">
        <div className="login-box">
            <h1 className="login-title">백프론트 강의실</h1>
            <p className="login-subtitle">로그인 후 강의를 이용할 수 있습니다.</p>

            <div className="login-form">
                <label className="login-label">아이디</label>
                  <input 
                   className="login-input"
                   type="text"
                   placeholder="아이디를 입력하세요."
                   value={loginId}
                   onChange={(event) => setLoginId(event.target.value)}
                    />
            <label className="login-label">비밀번호</label>
                  <input  
                   className="login-input"
                   type="password"
                   placeholder="비밀번호를 입력하세요."
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}
                   onKeyDown={(event)=>{
                    if(event.key === "Enter"){
                            handleLogin();
                        }
                   }}
             />
                   
            <button className="login-button" onClick={handleLogin}>로그인</button>
            <p className="login-signup-text">
            아직 회원이 아니신가요?{" "}
            <span className="login-signup-link" onClick={() => navigate("/signup")}>
            회원가입
            </span>
            </p>
        </div>
      </div>
    </div>
    );
}

export default LoginPage;