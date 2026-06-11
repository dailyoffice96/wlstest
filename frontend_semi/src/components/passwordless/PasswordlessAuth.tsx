import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../passwordless/PasswordlessAuth.css";

interface PasswordlessAuthProps {
  onBack?: () => void;
}

function PasswordlessAuth({ onBack }: PasswordlessAuthProps) {
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleConfirm = () => {
    const authCode = code.join("");

    if (authCode.length !== 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

    alert("Passwordless 인증 성공!");

    // 나중에 메인 이동
    navigate("/");
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigate("/api/members/login");
  };

  return (
    <div className="passwordless-auth-page">
      <div className="passwordless-auth-box">
        <button
          className="auth-back-button"
          onClick={handleBack}
        >
          ←
        </button>

        <h1 className="passwordless-auth-title">
          Passwordless 설정
        </h1>

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
          ⏱ 남은 시간 00:24
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
  );
}

export default PasswordlessAuth;