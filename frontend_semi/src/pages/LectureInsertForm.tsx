import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import customAxios from "../api/axiosInstance";

interface AppRoutesProps { // App.tsx에서 온 프롭스
    user: User | null; // 로그인하면 App.tsx의 setUser로 의미있는 데이터가 되어 프롭스로 받아짐 (로그인안하면 null)
}

function App({ user }: AppRoutesProps) {
    const navigate = useNavigate();

    useEffect(() => {
        // useEffect 안에서도 ?. 문법으로 깔끔하게 줄일 수 있습니다.
        if (user?.role !== 'ADMIN') {
            alert('관리자만 접근할 수 있는 페이지입니다.');
            navigate(user ? '/' : '/api/members/login'); // 로그인 여부에 따라 이동지 분기
            return;
        }
    }, [user, navigate]);


    const comment = '강의 등록'; // 제목으로도 쓰고 버튼이름으로도 쓸거같아서 변수로 만든 것

    // lecture의 초기값 설
    // 스프링의 Entity보고 작성 (Long id / LocalDate created_at / updated_at은 스프링이 자동 생성함)
    const initial_value = {
        category: '',
        name: '',
        lecture_description: '',
        code_example: '',
        code_description: '',
        language: ''
    };

    // 등록하고자하는 강의 정보
    // 초기 값은 initial_value
    const [lecture, setLecture] = useState(initial_value);

    const initialErrors = {
        category: '',
        name: '',
        lecture_description: '',
        code_example: '',
        code_description: '',
        language: '',
        general: ''
    };

    // State를 만드는데 errors라는 이름으로 만들고 초기값은 initialErrors로 설정한다.
    const [errors, setErrors] = useState(initialErrors);


    // 대주제 선택 옵션을 만드는 코드
    // ===== [추가] 대주제(category) select 관련 state =====
    // 기존 강의들의 대주제(category) 목록 (중복 제거된 배열)
    const [categories, setCategories] = useState<string[]>([]);

    // select에서 현재 선택된 값 (직접 입력을 고르면 "custom")
    const [selectedCategory, setSelectedCategory] = useState('');

    // ===== [추가] 기존 강의 목록을 불러와서 중복 없는 대주제 배열 만들기 =====
    useEffect(() => {
        // 강의 전체 목록을 가져오는 주소 (LecturePage.tsx와 동일한 주소 사용)
        const url = `${API_BASE_URL}/api/lecture/list`;

        customAxios
            .get(url)
            .then((response) => {
                // response.data : Lecture[] (각 객체에 category 요소가 있음)
                // map으로 category(대주제)만 뽑아서 문자열 배열로 만듬
                const categoryList = response.data.map(
                    // lecture 라는 매개변수로 돌릴건데 category: string라는 키값을 가지고 있는 lecture 여야 함
                    // lecture의 데이터인 category를 추출해서 새로운 배열인 categoryList에 담음
                    (lecture: { category: string }) => lecture.category
                );

                // 중복된 대주제 삭제
                // Set은 중복을 허용하지 않는 자료구조여서 중복된 대주제가 제거됨
                // Set은 컬렉션이라서 전개 연산자(...)로 다시 일반 배열로 만들어서 state에 넣음
                const uniqueCategories = [...new Set<string>(categoryList)];

                // 중복이 없는 대주제 배열을 categories state 배열에 넣음
                setCategories(uniqueCategories);
            })
            .catch((error) => {
                console.log(`대주제 목록 불러오기 실패 : ${error}`);
            });
    }, []); // [] : 페이지가 처음 켜질때 한 번만 실행

    // ===== [추가] 대주제 select가 변경될 때 동작하는 함수 =====
    // 직접 입력과 아닌 것을 가르기 위해서 만든 함수
    const CategorySelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;

        // select에서 고른 값을 selectedCategory state에 저장
        // (이 값으로 "직접 입력" 창을 보여줄지 말지 결정함)
        setSelectedCategory(value);

        // "custom"(직접 입력)을 고르면 lecture.category는 비워서 새로 입력받게 함
        // 그 외에는 선택한 대주제를 그대로 lecture.category에 넣음
        if (value === 'custom') {
            setLecture({ ...lecture, category: '' });
        } else {
            setLecture({ ...lecture, category: value });
        }
    };


    // Change 이벤트가 발생하면 동작하는 함수
    // 폼 양식에서 어떠한 컨트롤의 값이 변경되었습니다.
    // ()는 매개변수 {}는 동작
    // HTMLInputElement 한 줄 입력상자
    // HTMLTextAreaElement 멀티라인 입력상자
    const ControlChange = (
        // HTMLInputElement : HTML부분의 input(jsx의 Control)의 요소 (한 줄 입력)
        // HTMLTextAreaElement : HTML부분의 textarea(jsx의 Control)의 요소 (여러 줄 입력)
        // HTMLSelectElement : HTML부분의 select(jsx의 Select)의 요소 (콤보박스 선택 입력)
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        // event.target : 해당 이벤트를 발생시킨 요소를 의미
        // event.target 객체가 가진 원소중 name과 value인 키의 값만 골라서 변수로 지정함
        // event.target.name : Form.Control의 속성인 name의 값
        // event.target.value : 사용자가 입력한 값
        const { name, value } = event.target;

        // Lecture가 객체여서 중괄호 사용
        // {[name]: value}만 적으면 name을 제외한 나머지 속성들이 휘발됨
        // 이를 방지하기 위해 ...lecture 추가 (...lecture는 기존 lecture의 값을 가져오는 것)
        // ...lecture로 가져온 기존의 [name]의 value는 내가 새로 적은 value로 덮어쓰기 됨
        // (...은 전개 연산자로 불림 - 예약어) (...객체 or 배열 : 객체 or 배열의 원소들을 가져오는 문법)
        setLecture({ ...lecture, [name]: value });
    };

    const SubmitAction = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        // 원래 취해야 할 동작을 못하게 하기
        event.preventDefault();

        try {
            const url = `${API_BASE_URL}/api/lecture/insert`;
            const config = {
                headers: { 'Content-Type': 'application/json' }
            };

            const response = await customAxios.post(url, lecture, config);

            console.log('응답 데이터 : ');
            console.log(`${response.data}`);

            alert('강의가 등록되었습니다.');

            // 초기화 하기
            // 강제로 '/product/list'로 이동해서 초기화하지 않아도 되지만
            // 뒤로가기 버튼을 눌렀을때 입력했던 데이터가 남아있으니까 초기화 함
            setLecture(initial_value);
            setErrors(initialErrors);
            setSelectedCategory(''); // [추가] 대주제 select 선택값도 초기화

            navigate('/api/lecture/list');

        } catch (error: unknown) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                // 백엔드에서 전달받은 오류 메시지를 저장
                setErrors((prev) => ({
                    ...prev,
                    ...error.response?.data?.errors,
                    general: error.response?.data?.message || '강의 등록 중 오류가 발생했습니다.'
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    general: '서버와의 통신 중 오류가 발생했습니다.'
                }));
            }
        };
    };

    return (
        <Container style={{ marginTop: '90px' }}>
            <h1>{comment}</h1>

            {/* 일반 오류 메시지 */}
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}

            {/* 특별한 말이 없으면 Form을 불러올때 bootstrap으로 하면 됨 */}
            <Form onSubmit={SubmitAction}> {/* id는 자동 생성하게 스프링에 만들어 놓아서 입력란에 넣을 필요는 없음 */}

                {/* 대주제(category) 입력창 */}
                {/* controlId="formCategory" 이건 필수는 아님 */}
                <Form.Group as={Row} className="mb-3" controlId="formCategory">
                    <Form.Label column sm={2}>
                        대주제
                    </Form.Label>
                    <Col sm={10}>
                        {/* ===== [변경] 기존 대주제들을 나열하는 select ===== */}
                        {/* 기존엔 textarea로 직접 입력만 받았지만, */}
                        {/* 이제는 기존 강의들의 대주제를 select로 보여주고 */}
                        {/* 없는 대주제는 "직접 입력"으로 새로 작성할 수 있게 함 */}
                        <Form.Select
                            // select에서 선택된 값 (selectedCategory state와 연결)
                            value={selectedCategory}

                            // 값이 바뀌면 위에서 만든 CategorySelectChange 함수 실행
                            onChange={CategorySelectChange}

                            // 값을 정확하게 boolean 타입으로 만들어서 true나 false로 만들려고 !!사용
                            isInvalid={!!errors.category}

                            className="mb-2"
                        >
                            {/* 아무것도 선택하지 않은 기본 상태 */}
                            <option value="">대주제를 선택해 주세요.</option>

                            {/* categories 배열(중복 제거된 대주제들)을 돌면서 option 생성 */}
                            {/* map()함수는 배열에만 사용 가능 / key는 React가 각 요소를 구분하는 값 */}
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}

                            {/* 선택할 대주제가 없을 때 직접 입력하기 위한 option */}
                            <option value="custom">직접 입력</option>
                        </Form.Select>

                        {/* ===== [변경] "직접 입력"을 선택했을 때만 보이는 입력창 ===== */}
                        {/* selectedCategory가 "custom"일 때만 아래 textarea가 화면에 나옴 */}
                        {/* name="category"여서 ControlChange가 lecture.category를 갱신함 */}
                        {selectedCategory === 'custom' && (
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="새로운 대주제를 입력해 주세요."

                                // 정확히 말하자면 name 속성이 아니고 id속성임
                                // 그래서 Form.Group태그의 controlId속성에 formCategory으로 설정함
                                // name이 lecture_description면 lecture_description로 바꾸고 formlecture_description로 하면 됨
                                name="category"
                                value={lecture.category}

                                // Change 이벤트 : 값이 변하면 동작하는 이벤트
                                onChange={ControlChange}

                                // 값을 정확하게 boolean 타입으로 만들어서 true나 false로 만들려고 !!사용
                                isInvalid={!!errors.category}
                            />
                        )}

                        {/* 문제가 생기면 나오는 경고성 멘트 */}
                        <Form.Control.Feedback type="invalid">
                            {errors.category}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 소주제(name) 입력창 */}
                <Form.Group as={Row} className="mb-3" controlId="formName">
                    <Form.Label column sm={2}>
                        파일 이름
                    </Form.Label>
                    <Col sm={10}> {/* Form.Control은 HTML의 form의 input같은 것 */}
                        <Form.Control
                            type="text"
                            placeholder="파일 이름을 입력해 주세요."

                            // 정확히 말하자면 name 속성이 아니고 id속성임
                            name="name"
                            value={lecture.name}

                            // Change 이벤트 : 값이 변하면 동작하는 이벤트
                            onChange={ControlChange}

                            // 값을 정확하게 boolean 타입으로 만들어서 true나 false로 만들려고 !!사용
                            isInvalid={!!errors.name}
                        />

                        {/* 문제가 생기면 나오는 경고성 멘트 */}
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 강의 설명(lecture_description) 입력창 */}
                <Form.Group as={Row} className="mb-3" controlId="formlecture_description">
                    <Form.Label column sm={2}>
                        강의 설명
                    </Form.Label>
                    <Col sm={10}> {/* Form.Control은 HTML의 form의 input같은 것 */}
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="강의 설명를 입력해 주세요."

                            // 정확히 말하자면 name 속성이 아니고 id속성임
                            name="lecture_description"
                            value={lecture.lecture_description}

                            // Change 이벤트 : 값이 변하면 동작하는 이벤트
                            onChange={ControlChange}

                            // 값을 정확하게 boolean 타입으로 만들어서 true나 false로 만들려고 !!사용
                            isInvalid={!!errors.lecture_description}
                        />

                        {/* 문제가 생기면 나오는 경고성 멘트 */}
                        <Form.Control.Feedback type="invalid">
                            {errors.lecture_description}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 코드 예시(code_example) 입력창 */}
                <Form.Group as={Row} className="mb-3" controlId="formCode_example">
                    <Form.Label column sm={2}>
                        코드 예시
                    </Form.Label>
                    <Col sm={10}> {/* Form.Control은 HTML의 form의 input같은 것 */}
                        <Form.Control
                            as="textarea"
                            rows={8}
                            placeholder="코드 예시를 입력해 주세요."

                            // 정확히 말하자면 name 속성이 아니고 id속성임
                            name="code_example"
                            value={lecture.code_example}

                            // Change 이벤트 : 값이 변하면 동작하는 이벤트
                            onChange={ControlChange}

                            // 값을 정확하게 boolean 타입으로 만들어서 true나 false로 만들려고 !!사용
                            isInvalid={!!errors.code_example}
                        />

                        {/* 문제가 생기면 나오는 경고성 멘트 */}
                        <Form.Control.Feedback type="invalid">
                            {errors.code_example}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 코드 설명(code_description) 입력창 */}
                <Form.Group as={Row} className="mb-3" controlId="formCode_description">
                    <Form.Label column sm={2}>
                        코드 설명
                    </Form.Label>
                    <Col sm={10}> {/* Form.Control은 HTML의 form의 input같은 것 */}
                        <Form.Control
                            as="textarea"
                            rows={8}
                            placeholder="코드 설명을 입력해 주세요."

                            // 정확히 말하자면 name 속성이 아니고 id속성임
                            name="code_description"
                            value={lecture.code_description}

                            // Change 이벤트 : 값이 변하면 동작하는 이벤트
                            onChange={ControlChange}

                            // 값을 정확하게 boolean 타입으로 만들어서 true나 false로 만들려고 !!사용
                            isInvalid={!!errors.code_description}
                        />

                        {/* 문제가 생기면 나오는 경고성 멘트 */}
                        <Form.Control.Feedback type="invalid">
                            {errors.code_description}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 언어(language) 입력창 */}
                {/* Form.Control말고 select로 콤보 박스 만들기 */}
                {/* 스프링의 constant폴더의 Language.java인 이용해서 */}
                {/* type, placeholder 삭제 */}
                <Form.Group as={Row} className="mb-3" controlId="formLanguage">
                    <Form.Label column sm={2}>
                        언어
                    </Form.Label>
                    <Col sm={10}> {/* Form.Select는 HTML의 form의 select같은 것 */}
                        <Form.Select
                            // 정확히 말하자면 name 속성이 아니고 id속성임
                            name="language"
                            value={lecture.language}

                            // Change 이벤트 : 값이 변하면 동작하는 이벤트
                            onChange={ControlChange}
                            isInvalid={!!errors.language}
                        >
                            <option value="-">언어 카테고리를 선택해 주세요.</option>
                            <option value="java">java</option>
                            <option value="typescript">typescript</option>
                            <option value="sql">sql</option>
                            <option value="text">text</option>
                        </Form.Select>

                        {/* 문제가 생기면 나오는 경고성 멘트 */}
                        <Form.Control.Feedback type="invalid">
                            {errors.language}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit" size="lg">
                    {comment}
                </Button>

            </Form>
        </Container>

    );
};

export default App;