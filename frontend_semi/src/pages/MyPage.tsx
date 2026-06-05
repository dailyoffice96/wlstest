import { useEffect, useState } from "react";
import MyPageSideBar from "../components/layout/MyPageSideBar";
import { API_BASE_URL } from "../config/config";
import "./MyPage.css";
import axios from "axios";

type MemberInfo = {
    loginId: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    learningProfile: number[];
};

type MemberUpdateForm = {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    learningProfile: number[];
};

function MyPage() {
    const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
    const [loading, setLoading] = useState(true);
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [memberPassword, setMemberPassword] = useState("");
    const [memberPasswordConfirm, setMemberPasswordConfirm] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[~!@#$%^&*]).{8,}$/;

    const isPasswordTyped = memberPassword.length > 0;
    const isPasswordConfirmTyped = memberPasswordConfirm.length > 0;

    const isPasswordValid = passwordRegex.test(memberPassword);

    const isPasswordMatch =
          memberPassword.length > 0 &&
          memberPasswordConfirm.length > 0 &&
          memberPassword === memberPasswordConfirm;

    const [memberUpdateForm, setMemberUpdateForm] = useState<MemberUpdateForm>({
        name: "",
        email: "",
        phone: "",
        birthDate: "",
        learningProfile: [],
    });

    const profileNameMap: Record<number, string> = {
        1: "FRONT",
        2: "BACK",
        3: "웹 서비스",
        4: "UI",
    };

    const profileOptions = [
        { id: 1, name: "FRONT" },
        { id: 2, name: "BACK" },
        { id: 3, name: "웹 서비스" },
        { id: 4, name: "UI" },
    ];

    const getMemberInfo = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(`${API_BASE_URL}/api/members/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("회원정보 응답 : ", response.data);

            setMemberInfo(response.data);

            setMemberUpdateForm({
                name: response.data.name || "",
                email: response.data.email || "",
                phone: response.data.phone || "",
                birthDate: response.data.birthDate || "",
                learningProfile: response.data.learningProfile || [],
            });
        } catch (error) {
            console.error("회원정보 조회 실패:", error);
            alert("회원정보를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMemberInfo();
    }, []);

    if (loading) {
        return <div className="mypage-main">회원정보를 불러오는 중입니다...</div>;
    }

    if (memberInfo === null) {
        return <div className="mypage-main">회원정보가 없습니다!</div>;
    }

    const handlePasswordCheck = () => {
    if (!isPasswordTyped || !isPasswordConfirmTyped) {
        alert("비밀번호와 비밀번호 확인을 모두 입력해 주세요.");
        return;
    }

    if (!isPasswordValid) {
        alert("비밀번호는 8자리 이상, 대문자 1개 이상, 특수문자를 포함해야 합니다.");
        return;
    }

    if (!isPasswordMatch) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    alert("사용 가능한 비밀번호입니다.");
};

 const handlePasswordChange = async () => {
    if (!currentPassword.trim()) {
        alert("현재 비밀번호를 입력해 주세요.");
        return;
    }

    if (!memberPassword || !memberPasswordConfirm) {
        alert("변경할 비밀번호를 입력해 주세요.");
        return;
    }

    if (!isPasswordValid) {
        alert("비밀번호는 8자리 이상, 대문자 1개 이상, 특수문자를 포함해야 합니다.");
        return;
    }

    if (!isPasswordMatch) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    try {
        const token = localStorage.getItem("accessToken");

        await axios.patch(
            `${API_BASE_URL}/api/members/me/password`,
            {
                currentPassword: currentPassword,
                newPassword: memberPassword,
                newPasswordConfirm: memberPasswordConfirm,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        alert("비밀번호가 변경되었습니다.");

        setCurrentPassword("");
        setMemberPassword("");
        setMemberPasswordConfirm("");
    } catch (error) {
        console.error("비밀번호 변경 실패:", error);
        alert("비밀번호 변경에 실패했습니다.");
    }
};

    const handleEditModeStart = () => {
        setIsEditMode(true);

        setMemberUpdateForm({
            name: memberInfo.name || "",
            email: memberInfo.email || "",
            phone: memberInfo.phone || "",
            birthDate: memberInfo.birthDate || "",
            learningProfile: memberInfo.learningProfile || [],
        });
    };

    const handleEditCancel = () => {
        setIsEditMode(false);

        setMemberUpdateForm({
            name: memberInfo.name || "",
            email: memberInfo.email || "",
            phone: memberInfo.phone || "",
            birthDate: memberInfo.birthDate || "",
            learningProfile: memberInfo.learningProfile || [],
        });
    };

    const handleMemberUpdateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setMemberUpdateForm({
            ...memberUpdateForm,
            [name]: value,
        });
    };

    const handleLearningProfileChange = (profileId: number) => {
        const alreadySelected = memberUpdateForm.learningProfile.includes(profileId);

        if (alreadySelected) {
            setMemberUpdateForm({
                ...memberUpdateForm,
                learningProfile: memberUpdateForm.learningProfile.filter(
                    (id) => id !== profileId
                ),
            });
            return;
        }

        setMemberUpdateForm({
            ...memberUpdateForm,
            learningProfile: [...memberUpdateForm.learningProfile, profileId],
        });
    };

    const handleMemberInfoUpdate = async () => {
        if (!memberUpdateForm.email.trim()) {
            alert("이메일을 입력해 주세요.");
            return;
        }

        if (!memberUpdateForm.phone.trim()) {
            alert("전화번호를 입력해 주세요.");
            return;
        }

        if (!memberUpdateForm.birthDate.trim()) {
            alert("생년월일을 입력해 주세요.");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");

            await axios.put(`${API_BASE_URL}/api/members/me`, memberUpdateForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("회원정보가 수정되었습니다.");

            setIsEditMode(false);
            await getMemberInfo();
        } catch (error) {
            console.error("회원정보 수정 실패:", error);
            alert("회원정보 수정에 실패했습니다.");
        }
    };

    return (
        <div className="mypage-page">
            <MyPageSideBar />

            <main className="mypage-main">
                <section className="member-info-card">
                    <div className="member-info-layout">
                        <aside className="member-profile-visual">
                            <div className="member-profile-logo">
                                <span>👤</span>
                            </div>

                            <div className="member-profile-text">
                                <p className="member-profile-badge">MY PROFILE</p>
                                <h2>회원정보 관리</h2>
                                <p>
                                    내 계정 정보와 비밀번호를 한 곳에서 확인하고
                                    관리할 수 있습니다.
                                </p>
                            </div>

                            <div className="member-profile-point">
                                <span>FULLSTACK CLASSROOM</span>
                                <strong>PROFILE</strong>
                            </div>
                        </aside>

                        <div className="member-info-content">
                            <div className="member-info-header">
                                <p className="member-info-badge">PROFILE</p>
                                <h1>회원정보</h1>
                                <p>내 계정 정보와 비밀번호를 관리할 수 있습니다.</p>
                            </div>

                            <form className="member-info-form">
                                <div className="member-form-row">
                                    <label>아이디</label>
                                    <input
                                        className="member-info-input"
                                        type="text"
                                        value={memberInfo.loginId}
                                        readOnly
                                    />
                                </div>

                                <div className="member-form-row">
                                    <label>이름</label>
                                    <input
                                        className="member-info-input"
                                        type="text"
                                        name="name"
                                        value={
                                            isEditMode
                                                ? memberUpdateForm.name
                                                : memberInfo.name
                                        }
                                        readOnly={true}
                                    />
                                </div>

<div className="member-password-area">
    <label>비밀번호</label>

    <div className="member-password-fields password-change-fields">
        <div className="member-password-input-group member-password-current">
    <input
        className="member-info-input"
        type="password"
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
        placeholder="현재 비밀번호를 입력하세요."
    />

    {(isEditMode || currentPassword.length > 0) && (
        <p className="member-password-guide">
            현재 사용 중인 비밀번호를 입력해 주세요.
        </p>
    )}
</div>

        <div className="member-password-input-group">
            <input
                className={
                    isPasswordTyped && !isPasswordValid
                        ? "member-info-input password-error"
                        : "member-info-input"
                }
                type="password"
                value={memberPassword}
                onChange={(event) => setMemberPassword(event.target.value)}
                placeholder="새 비밀번호를 입력하세요."
            />

            {(isEditMode || isPasswordTyped) && (
                <p
                    className={
                        isPasswordTyped && !isPasswordValid
                            ? "member-password-guide error"
                            : "member-password-guide"
                    }
                >
                    8자리 이상, 대문자 1개 이상, 특수문자 포함
                </p>
            )}
        </div>

        <div className="member-password-input-group">
            <input
                className={
                    isPasswordConfirmTyped && !isPasswordMatch
                        ? "member-info-input password-error"
                        : "member-info-input"
                }
                type="password"
                value={memberPasswordConfirm}
                onChange={(event) =>
                    setMemberPasswordConfirm(event.target.value)
                }
                placeholder="새 비밀번호를 다시 입력하세요."
            />

            {(isEditMode || isPasswordConfirmTyped) && (
                <p
                    className={
                        isPasswordConfirmTyped && isPasswordMatch
                            ? "member-password-guide success"
                            : isPasswordConfirmTyped && !isPasswordMatch
                                ? "member-password-guide error"
                                : "member-password-guide"
                    }
                >
                    {isPasswordConfirmTyped
                        ? isPasswordMatch
                            ? "비밀번호가 일치합니다."
                            : "비밀번호가 일치하지 않습니다."
                        : isEditMode
                            ? "비밀번호 확인을 입력해 주세요."
                            : ""}
                </p>
            )}
        </div>

        <button
            type="button"
            className="member-password-button"
            onClick={handlePasswordCheck}
        >
            확인
        </button>
    </div>
</div>
                                <div className="member-form-row">
                                    <label>이메일</label>
                                    <input
                                        className="member-info-input"
                                        type="text"
                                        name="email"
                                        value={
                                            isEditMode
                                                ? memberUpdateForm.email
                                                : memberInfo.email
                                        }
                                        onChange={handleMemberUpdateChange}
                                        readOnly={!isEditMode}
                                    />
                                </div>

                                <div className="member-form-row">
                                    <label>전화번호</label>
                                    <input
                                        className="member-info-input"
                                        type="text"
                                        name="phone"
                                        value={
                                            isEditMode
                                                ? memberUpdateForm.phone
                                                : memberInfo.phone
                                        }
                                        onChange={handleMemberUpdateChange}
                                        readOnly={!isEditMode}
                                    />
                                </div>

                                <div className="member-form-row">
                                    <label>생년월일</label>
                                    <input
                                        className="member-info-input"
                                        type="date"
                                        name="birthDate"
                                        value={
                                            isEditMode
                                                ? memberUpdateForm.birthDate
                                                : memberInfo.birthDate
                                        }
                                        onChange={handleMemberUpdateChange}
                                        readOnly={!isEditMode}
                                    />
                                </div>

                                <div className="member-form-row">
                                    <label>관심학습분야</label>

                                    <div className="member-learning-box">
                                        {isEditMode ? (
                                            profileOptions.map((profile) => (
                                                <label
                                                    key={profile.id}
                                                    className="member-learning-check"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={memberUpdateForm.learningProfile.includes(
                                                            profile.id
                                                        )}
                                                        onChange={() =>
                                                            handleLearningProfileChange(profile.id)
                                                        }
                                                    />
                                                    <span>{profile.name}</span>
                                                </label>
                                            ))
                                        ) : memberInfo.learningProfile &&
                                          memberInfo.learningProfile.length > 0 ? (
                                            memberInfo.learningProfile
                                                .map((id) => profileNameMap[id])
                                                .filter((name) => name !== undefined)
                                                .map((name) => (
                                                    <span
                                                        key={name}
                                                        className="member-learning-chip"
                                                    >
                                                        {name}
                                                    </span>
                                                ))
                                        ) : (
                                            <span className="member-learning-empty">
                                                선택한 관심 학습 분야가 없습니다.
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="member-info-actions">
                                    {isEditMode ? (
                                        <>
                                            <button
                                                type="button"
                                                className="member-info-button secondary"
                                                onClick={handleEditCancel}
                                            >
                                                취소
                                            </button>

                                            <button
                                                type="button"
                                                className="member-info-button primary"
                                                onClick={handleMemberInfoUpdate}
                                            >
                                                저장하기
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                className="member-info-button secondary"
                                                onClick={handleEditModeStart}
                                            >
                                                회원정보 수정
                                            </button>

                                            <button
                                                type="button"
                                                className="member-info-button primary"
                                                onClick={handlePasswordChange}
                                            >
                                                비밀번호 변경
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default MyPage;