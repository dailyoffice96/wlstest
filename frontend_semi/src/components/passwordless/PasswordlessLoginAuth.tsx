import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../passwordless/PasswordlessAuth.css";

interface PasswordlessLoginAuthProps  {
  onBack?: () => void;
}

function PasswordlessLoginAuth({ onBack }: PasswordlessLoginAuthProps) {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(180);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;




  const handleCodeChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

      // 한 글자 입력하면 다음 칸으로 이동
      if (value && index < 5) {
        const nextInput = document.getElementById(
          `code-${index + 1}`
        ) as HTMLInputElement | null;

        nextInput?.focus();
      }
  };


  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigate("/members/login");
  };


  const handleConfirm = () => {
    const authCode = code.join("");

    if (authCode.length !== 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

//   const response = await fetch("http://localhost:9000/api/passwordless/verify", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       authCode,
//     }),
//   });

//   if (!response.ok) {
//     alert("인증번호가 올바르지 않습니다.");
//     return;
//   }


    alert("로그인이 완료되었습니다.");
    navigate("/signup/complete");
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);



  return (
    <div className="passwordless-auth-page">
      <div className="passwordless-auth-box">

        <h1 className="passwordless-auth-title">
          Passwordless 설정
        </h1>

        <div className="passwordless-auth-content">
        <div className="phone-icon-box">
          📱
        </div>

        <h2 className="auth-code-title">
          인증 번호 입력
        </h2>

        <p className="auth-code-desc">
          인증 앱에 생성된 6자리 인증 번호를 입력하세요.
        </p>

        <div className="auth-code-list">
          {code.map((num, index) => (
            <input
              id={`code-${index}`}
              key={index}
              className="auth-code-input"
              value={num}
              maxLength={1}
              onChange={(event) =>
                handleCodeChange(index, event.target.value)
              }
            />
          ))}
        </div>

        <p className="auth-timer">
               ⏱ 남은 시간{" "}
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
        </p>

        <button
          className="auth-confirm-button"
          onClick={handleConfirm}
        >
          확인
        </button>

        <button
          className="auth-cancel-button"
          onClick={handleBack}
        >
          취소
        </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordlessLoginAuth;