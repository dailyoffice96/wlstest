import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import customAxios from "../../api/axiosInstance";
import "../passwordless/PasswordlessSetting.css";

interface PasswordlessSettingProps {
  onBack?: () => void;
  onNext?: () => void;
}

interface RegisterInfo {
  qr: string;
  serverUrl: string;
  registerKey: string;
}

function PasswordlessSetting({
  onBack,
  onNext,
}: PasswordlessSettingProps) {
  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] =
    useState<RegisterInfo | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

 const fetchRegisterInfo = async () => {
   setIsLoading(true);
   setErrorMessage("");

   try {
     const response = await customAxios.post("/api/passwordless/join-ap", {
       userId: user.loginId,
       name: user.name,
       email: user.email,
     });

     console.log(response.data);

     setRegisterInfo(response.data.Data);
   } catch (error) {
     console.error(error);
     setErrorMessage("Passwordless 서버 연결을 확인해주세요.");
   } finally {
     setIsLoading(false);
   }
 };

  useEffect(() => {
    fetchRegisterInfo();
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigate("/members/login");
  };

  const handleNext = () => {
    navigate("/members/login/passwordlessRegisterAuth");
  };

  const handleQrReset = () => {
    fetchRegisterInfo();
  };

  return (
    <div className="passwordless-page">
      <div className="passwordless-box">
        <h1 className="passwordless-title">
          Passwordless 등록
        </h1>

        <div className="qr-box">
          {registerInfo?.qr ? (
            <img
              src={registerInfo.qr}
              alt="QR Code"
              className="qr-image"
            />
          ) : (
            <p className="qr-desc">
              QR 정보를 불러오는 중입니다.
            </p>
          )}

          <button
            type="button"
            className="qr-reset-button"
            onClick={handleQrReset}
            aria-label="QR 재발급">↻</button>
        </div>

        <p className="qr-title">
         스마트폰 앱에서
         아래 QR 코드를 스캔하세요.
        </p>

        {errorMessage && (
          <p className="qr-error">
            {errorMessage}
          </p>
        )}

        <div className="info-box">
          <div className="info-row">
            <span>서버 URL</span>
            <p>{registerInfo?.serverUrl ?? "-"}</p>
          </div>

          <div className="info-row">
            <span>등록 코드</span>
            <p>{registerInfo?.registerKey ?? "-"}</p>
          </div>
        </div>

        <button
          className="register-button"
          onClick={handleNext}
        >
          등록하기
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

export default PasswordlessSetting;