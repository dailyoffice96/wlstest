import { useNavigate } from "react-router-dom";
import "../passwordless/PasswordlessSetting.css";

interface PasswordlessSettingProps {
  onBack?: () => void;
  onNext?: () => void;
}

function PasswordlessSetting({
  onBack,
  onNext,
}: PasswordlessSettingProps) {

  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigate("/api/members/login");
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
      return;
    }

    navigate("/passwordlessAuth");
  };

  return (
    <div className="passwordless-page">
      <div className="passwordless-box">

        <button
          className="back-button"
          onClick={handleBack}
        >
          ←
        </button>

        <h1 className="passwordless-title">
          Passwordless 설정
        </h1>

        <div className="qr-box">
          <img
            src="/images/qr-sample.png"
            alt="QR"
          />
        </div>

        <p className="qr-title">
          Passwordless 앱으로 스캔하세요
        </p>

        <p className="qr-desc">
          인증을 위해 APP을 다운로드 받으세요
        </p>

        <div className="info-box">

          <div className="info-row">
            <span>서버 URL</span>
            <strong>
              passwordless-edu.oneidpay.com
            </strong>
          </div>

          <div className="info-row">
            <span>서비스 ID</span>
            <strong>
              a9ee5b969105...
            </strong>
          </div>

          <div className="info-row">
            <span>사용자 ID</span>
            <strong>
              testuser01
            </strong>
          </div>

          <div className="info-row">
            <span>앱 코드</span>
            <strong>
              GWR4rYZyrG
            </strong>
          </div>

        </div>

        <button
          className="register-button"
          onClick={handleNext}
        >
          등록하기
        </button>

      </div>
    </div>
  );
}

export default PasswordlessSetting;