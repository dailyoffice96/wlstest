import { useState } from "react";

function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/members/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginId,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data = await response.json();

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      alert("로그인 성공");

      console.log(data);

    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>로그인 테스트</h2>

      <input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}

export default LoginPage;