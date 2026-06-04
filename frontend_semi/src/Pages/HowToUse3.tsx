import {
    FiBookOpen,
    FiCheckCircle,
    FiMessageCircle,
    FiFolder,
    FiInfo,
    FiClock,
    FiImage,
    FiBarChart2
} from "react-icons/fi";

import "./HowToUse3.css";

const steps = [
    {
        number: 1,
        title: "문자를 보낼 대상을 선택해주세요.",
        type: "intro",
        bullets: [
            ["그룹별 선택", "그룹의 목록 된 모든 연락처를 받는 사람으로 설정하실 수 있습니다."],
            ["주소록 선택", "주소록에 등록 된 연락처를 받는 사람으로 설정하실 수 있습니다."],
            ["복사해서 붙여넣기", "별도의 주소록이 등록되지 않은 번호를 바로 추가하여 설정하실 수 있습니다."],
            ["직접입력 불러오기", "준비된 .txt 파일의 연락처를 바로 등록하여 설정하실 수 있습니다."]
        ]
    },

    {
        number: 2,
        title: "클릭하여 선택한 주소록의 전화번호를 전송대상에 추가해주세요.",
        type: "browser",
        tipTitle: "선택하여 추가한 그룹의 경우",
        tipText:
            "주소록팀/그룹별 추가 인원 확인이 가능하며 별도의 개별번호를 추가하시는 경우 직접입력 및 추가가 가능합니다."
    },

    {
        number: 3,
        title: "전송할 문자 내용을 입력해주세요.",
        type: "message",
        tipTitle: "문자 내용 입력",
        tipText:
            "제목과 본문 내용을 작성하고 필요한 경우 링크, 이미지, 치환문구를 함께 추가할 수 있습니다."
    },

    {
        number: 4,
        title: "이미지 또는 첨부파일을 추가해주세요.",
        type: "image",
        tipTitle: "이미지 첨부 안내",
        tipText:
            "홍보 이미지, 안내 이미지, 첨부파일 등을 추가하여 더 명확한 메시지를 전달할 수 있습니다."
    },

    {
        number: 5,
        title: "즉시 발송 또는 예약 발송을 선택해주세요.",
        type: "schedule",
        tipTitle: "발송 시간 설정",
        tipText:
            "바로 발송하거나 원하는 날짜와 시간을 지정하여 예약 발송을 진행할 수 있습니다."
    },

    {
        number: 6,
        title: "발송 결과와 전송 내역을 확인해주세요.",
        type: "result",
        tipTitle: "발송 결과 확인",
        tipText:
            "성공, 실패, 대기 상태를 확인하고 전송 내역을 관리할 수 있습니다."
    }
];

function MockImage({ type, tipTitle, tipText }) {

    if (type === "intro") {
        return (
            <div className="intro-image">

                <div className="book-icon">
                    <FiBookOpen />
                    <FiMessageCircle className="chat-icon" />
                </div>

            </div>
        );
    }

    return (
        <div className="mock-two-grid">

            <div className={`mock-browser ${type}`}>

                <div className="mock-top">
                    <span>SMS16</span>

                    <em>https://sms16.co.kr</em>

                    <strong>×</strong>
                </div>

                <div className="mock-body">

                    {type === "browser" && (
                        <>
                            <div className="receiver-row">

                                <b>받는 사람</b>

                                <div>수신번호를 입력하세요.</div>

                                <button>ENTER ↵</button>

                            </div>

                            <div className="group-row">

                                <FiCheckCircle />

                                <FiFolder />

                                <span>기본그룹1</span>

                            </div>
                        </>
                    )}

                    {type === "message" && (
                        <>
                            <div className="message-box">

                                <FiMessageCircle />

                                <p>전송할 문자 내용을 입력해주세요.</p>

                            </div>

                            <div className="tool-row">
                                <button>치환문구</button>
                                <button>링크추가</button>
                                <button>미리보기</button>
                            </div>
                        </>
                    )}

                    {type === "image" && (
                        <>
                            <div className="upload-box">

                                <FiImage />

                                <p>이미지 또는 파일을 첨부해주세요.</p>

                            </div>

                            <div className="file-row">
                                <span>banner_image.png</span>

                                <button>첨부완료</button>
                            </div>
                        </>
                    )}

                    {type === "schedule" && (
                        <>
                            <div className="schedule-box">

                                <FiClock />

                                <strong>2026.05.27</strong>

                                <p>오후 02:00 예약 발송</p>

                            </div>

                            <div className="time-row">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </>
                    )}

                    {type === "result" && (
                        <>
                            <div className="result-box">

                                <FiBarChart2 />

                                <strong>발송 완료</strong>

                                <p>성공 128건 · 실패 2건 · 대기 0건</p>

                            </div>

                            <div className="result-row">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </>
                    )}

                </div>
            </div>

            <div className="tip-box">

                <FiInfo />

                <div>

                    <strong>{tipTitle}</strong>

                    <p>{tipText}</p>

                </div>

            </div>

        </div>
    );
}

function HowToUse3() {

    return (
        <div className="howto3-page">

            <div className="howto3-header">

                <div className="howto3-title">

                    <FiBookOpen />

                    <h2>이용방법</h2>

                </div>

                <div className="howto3-breadcrumb">
                    STUDY PORTAL <span>&gt;</span> 이용방법
                </div>

            </div>

            <section className="howto3-card">

                <div className="guide-line"></div>

                {steps.map((step) => (

                    <article className="guide-step" key={step.number}>

                        <div className="guide-number">
                            {step.number}
                        </div>

                        <div
                            className={`guide-main ${
                                step.type === "intro"
                                    ? "intro-layout"
                                    : ""
                            }`}
                        >

                            <div className="guide-left">

                                <h3>{step.title}</h3>

                                {step.bullets && (

                                    <ul className="guide-list">

                                        {step.bullets.map((item, index) => (

                                            <li key={index}>

                                                <FiCheckCircle />

                                                <p>

                                                    <strong>{item[0]} : </strong>

                                                    {item[1]}

                                                </p>

                                            </li>

                                        ))}

                                    </ul>

                                )}

                            </div>

                            <MockImage
                                type={step.type}
                                tipTitle={step.tipTitle}
                                tipText={step.tipText}
                            />

                        </div>

                    </article>

                ))}

            </section>

        </div>
    );
}

export default HowToUse3;