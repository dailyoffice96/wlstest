import { useEffect, useState } from "react";
import type { Lecture } from "../../types/Lecture";
import { useNavigate } from "react-router-dom";

interface LecturePageProps {
    lectures: Lecture[]; // 전체 강의 목록 배열
    setCurrentLecture: (lecture: Lecture) => void; // 강의 선택 시 부모 상태를 바꿀 함수
    currentLecture_id: number | null; // 현재 선택된 강의의 ID
}

function Sidebar({ lectures, setCurrentLecture, currentLecture_id }: LecturePageProps) {
    const navigate = useNavigate();

    // lectures.reduce( (acc, lecture => {}, {} as Record<string, Lecture[]>) ) : 
    // lectures 배열을 반복문으로 돌리는데
    // acc라는 객체{}에 lectures 배열에서 꺼낸 lecture를 value로 넣을 것이다.
    // acc라는 객체의 key 타입은 string이고 value 타입은 Lecture[] 이다.
    // ** 결과값 : 대주제(category)를 key로 value는 그에 해당하는 강의들이 들어있음 **
    const groupedLectures = lectures.reduce((acc, lecture) => {
        if (!acc[lecture.category]) { // 객체[key] : 객체의 key의 value를 가져옴
            // acc 객체의 key가 lecture.category인 value를 빈배열로 만들어놓기
            acc[lecture.category] = [];
        }

        // 위에서 만든 key가 lecture.category인 빈 배열( acc[lecture.category] )에 lecture 객체를 넣는데
        // 이 lecture 객체는 LecturePage.tsx에서 프롭스로 받은 Lecture[]인 lectures 배열에 있는 객체
        // 그래서 그 객체의 category가 같은 것들만 모아서 category를 기준으로(key로) lecture 객체를 value로 넣음
        acc[lecture.category].push(lecture);
        // 그렇게 모아서 만든 acc 객체를 groupedLectures 변수(객체)에 넣음
        return acc;
        // {}은 acc의 초기값 - 즉, 객체로 acc를 정의하겠다라는 뜻
        // as Record<string, Lecture[]> : 
        // Record를 이용해서 타입 정의 : acc라는 객체는 key를 string으로 받고 value를 Lecture[]로 받음
    }, {} as Record<string, Lecture[]>);

    // useState<Record<string, boolean>>({}) : key타입이 string이고 value 타입이 boolean인 것들만
    // state 변수에 넣을 것고 이 변수의 초기값은 {} - 객체이다.
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (lectures.length > 0) { // 백엔드가 보내온 강의 목록이 1개라도 있으면
            setOpenCategories({
                // lectures배열의 0번째 객체의 category를 가져옴
                // [key] : value를 설정하는 문법이라서


                // key가 lectures[0].category이고 value가 true인 openCategories 객체의 요소가 생성됨
                [lectures[0].category]: true
            });
        }
    }, [lectures]);

    // openCategories state변수를 업데이트하는 함수
    // prev[category] : prev객체의 key가 category인 것의 value값을 표현 (value가 boolean타입)
    // ** 매개변수 category와 같은 이름의 key값인 category의 value를 반전시키는 함수 **
    // 탑다운 토글을 움직이기 위해서 만드는 함수
    // 만약 prev[category]가 없으면, 즉 매개변수에 들어온 category 자체가 key로 존재하지 않으면 false여서
    // 그것의 !(반대)는 true가 됨
    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <aside
            className="lecture-sidebar"
            style={{
                width: "320px",
                background: "linear-gradient(180deg, #2588f0, #0753bf)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                color: "white"
            }}
        >
            {/* 상단 영역 */}
            <div
                style={{
                    padding: "24px",
                    borderBottom: "1px solid rgba(255,255,255,0.2)"
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: "22px",
                        fontWeight: "bold"
                    }}
                >
                    📚 학습 목차
                </h2>

                <p
                    style={{
                        marginTop: "8px",
                        marginBottom: 0,
                        fontSize: "13px",
                        opacity: 0.8
                    }}
                >
                    총 {lectures.length}개의 강의
                </p>
            </div>

            {/* 카테고리 목록 */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "16px"
                }}
            > {/* groupedLectures는 배열이 아니고 객체여서 map()을 직접 쓸 수 없음 */}
                {/* object.entries()는 객체 안에 들어있는 데이터(key와 value)를 배열형태로 바꿔줌 */}
                {/* 객체를 배열형식으로 만들다보니 배열을 요소로 가진 배열이 생성이 됨 */}
                {/* 배열의 요소인 배열의 [0]은 key / [1]은 value가 됨 */}
                {/* 따로 꺼내서 매개변수로 쓰기 귀찮아서 []대괄호를 이용해서 */}
                {/* [0]인 key는 category 변수에 넣고 [1]은 value는 lectureList 변수(배열?)에 넣음 */}
                {/* 결과적으로 category에는 lecture의 category(string)들이 들어있고 */}
                {/* lectureList에는 그 category인 lecture 객체가 들어있음 */}
                {Object.entries(groupedLectures).map(([category, lectureList]) => (
                    <div
                        key={category}
                        style={{
                            marginBottom: "12px"
                        }}
                    >
                        {/* 대주제 */}
                        <div
                            onClick={() => toggleCategory(category)}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 14px",
                                cursor: "pointer",
                                borderRadius: "8px",
                                background: "rgba(255,255,255,0.15)",
                                fontWeight: "bold"
                            }}
                        >
                            <span>📁 {category}</span>
                            <span> {/* 삼항연산자를 이용해서 화살표 모양 바꾸기 */}
                                {openCategories[category] ? "▲" : "▼"}
                            </span>
                        </div>

                        {/* 소주제 */}
                        {/* openCategories[category] 값이 true라면 && 오른쪽에 있는 */}
                        {/* 코드를 실행하는 조건식임 */}
                        {/* ** openCategories[category] 값이 true면 소주제들을 보여줌  */}
                        {openCategories[category] && (
                            <div
                                style={{
                                    marginTop: "6px",
                                    marginLeft: "10px"
                                }}
                            >
                                {lectureList.map(lecture => {
                                    // 선택한 lecture와 같은 lecture가 반복되다가
                                    // 나오면 그 lecture를 하이라이트 표시함
                                    const selected =
                                        lecture.id === currentLecture_id;

                                    return (
                                        <div
                                            key={lecture.id}
                                            onClick={() => setCurrentLecture(lecture)}
                                            style={{
                                                padding: "10px 12px",
                                                marginBottom: "4px",
                                                cursor: "pointer",
                                                borderRadius: "6px",
                                                background: selected
                                                    ? "white"
                                                    : "transparent",
                                                color: selected
                                                    ? "#0753bf"
                                                    : "white",
                                                fontWeight: selected
                                                    ? "bold"
                                                    : "normal"
                                            }}
                                        >
                                            • {lecture.name}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 새 글 작성 버튼 */}
            <div
                style={{
                    padding: "20px",
                    borderTop: "1px solid rgba(255,255,255,0.2)"
                }}
            >
                <button
                    onClick={() => navigate("/lecture/insert")}
                    style={{
                        width: "100%",
                        height: "55px",
                        background: "transparent",
                        color: "white",
                        border: "2px solid white",
                        borderRadius: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    + 새 글 작성
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;