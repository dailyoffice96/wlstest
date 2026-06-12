import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../passwordless/PasswordlessSetting.css";
import QRCode from "react-qr-code";

interface PasswordlessSettingProps {
  onBack?: () => void;
  onNext?: () => void;
}

//Passwordless 등록 정보 조회
interface RegisterInfo {
  qr: string;
  serverUrl: string;
  registerKey: string;
}

function PasswordlessSetting({onBack, onNext,}: PasswordlessSettingProps) {

  const navigate = useNavigate();
  // QR 재발급 시 QR 값을 변경하기 위한 상태값
  const [nonce, setNonce] = useState(Date.now());

 const [registerInfo, setRegisterInfo] = useState<RegisterInfo | null>(null);


  // 취소 버튼 클릭 시 로그인 화면으로 이동
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate("/api/members/login");
  };

  // 등록하기 버튼 클릭 시 인증번호 입력 화면으로 이동
  const handleNext = () => {
     alert("Passwordless 설정이 완료되었습니다.");
     if (onNext) {
       onNext();
       return;
     }
    navigate("/api/members/login/passwordlessRegisterAuth");
  };

 // QR 재발급 버튼 클릭 시 새로운 값을 생성하여 QR 갱신
  const handleQrReset = () => {
    setNonce(Date.now());
     alert("재발급되었습니다.");

  };

// 컴포넌트 최초 로딩 시 등록 정보 조회
   useEffect(() => {
     fetch("http://localhost:9000/api/passwordless/register-info")
       .then((res) => res.json())
       .then((responseData) => {
        setRegisterInfo(responseData.data);
       });
   }, []);

  return (
    <div className="passwordless-page">
      <div className="passwordless-box">
        <h1 className="passwordless-title">
          Passwordless 설정</h1>

        {/*qr 코드*/}
        <div className="qr-box">
          {registerInfo?.qr && (
            <img
              src={registerInfo.qr}
              alt="QR Code"
              className="qr-image"
            />
          )}
          <button
            type="button"
            className="qr-reset-button"
            onClick={handleQrReset}
            aria-label="QR 재발급"> ↻ </button>
        </div>

        {/*설명문*/}
        <p className="qr-title">Passwordless 앱으로 스캔하세요</p>
        <p className="qr-desc"> 인증을 위해 APP을 다운로드 받으세요</p>


        {/*Passwordless 정보 조회 */}
        <div className="info-box">
          <div className="info-row">
            <span>서버 URL</span>
            <p>{registerInfo?.serverUrl}</p>
          </div>

          <div className="info-row">
            <span>등록 코드</span>
            <p>{registerInfo?.registerKey}</p>
          </div>
        </div>

        <button
          className="register-button"
          onClick={handleNext}>등록하기</button>

         <button
          className="auth-cancel-button"
          onClick={handleBack} >취소</button>
      </div>
    </div>
  );
}

export default PasswordlessSetting;