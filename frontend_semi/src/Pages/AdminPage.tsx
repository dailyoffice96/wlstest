import { useEffect, useState } from "react";
import MyPageSideBar from "../components/layout/MyPageSideBar";
import customAxios from "../api/axiosInstance";
import "./AdminPage.css";

interface AdminStatus {
    totalMemberCount: number;
    todayJoinMember: number;
    totalLectureCount: number;
}

interface AdminMember {
    memberId: number;
    loginId: string;
    name: string;
    email: string;
    createdAt: string;
    role: string;
}

function AdminPage() {

    const [status, setStatus] = useState<AdminStatus | null>(null);

    const [members, setMembers] = useState<AdminMember[]>([]);

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getAdminStatus();
        getMemberList();
    }, []);

    const getAdminStatus = async () => {
        try {
            const response = await customAxios.get("/api/admin");

            setStatus(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const getMemberList = async () => {
        try {

            const response = await customAxios.get(
                "/api/admin/members"
            );

            console.log("회원목록 응답:", response.data);
            console.log("회원목록 content:", response.data.content);

            setMembers(response.data.content || []);

        } catch (error) {
            console.error(error);
        }
    };

    const searchMember = async () => {
        try {

            const response = await customAxios.get(
                `/api/admin/members?keyword=${keyword}`
            );

            setMembers(response.data.content || []);

        } catch (error) {
            console.error(error);
        }
    };

    const deleteMember = async (memberId: number) => {

        if (!window.confirm("회원을 탈퇴시키겠습니까?")) {
            return;
        }

        try {

            await customAxios.delete(
                `/api/admin/members/${memberId}`
            );

            alert("회원이 삭제되었습니다.");

            getMemberList();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="admin-page">

            <MyPageSideBar />

            <main className="admin-main">

                <div className="admin-card">

                    <div className="admin-header">
                        <span>FAVORITE</span>

                        <h1>관리자 페이지</h1>

                        <p>
                            시스템 현황을 한눈에 확인하고 관리할 수 있습니다.
                        </p>
                    </div>

                    <section className="admin-status">

                        <div className="status-box">
                            <h4>전체 회원 수</h4>
                            <strong>
                                {status?.totalMemberCount ?? 0}명
                            </strong>
                        </div>

                        <div className="status-box">
                            <h4>오늘 가입자</h4>
                            <strong>
                                {status?.todayJoinMember ?? 0}명
                            </strong>
                        </div>

                        <div className="status-box">
                            <h4>전체 강의 수</h4>
                            <strong>
                                {status?.totalLectureCount ?? 0}개
                            </strong>
                        </div>

                        <div className="status-box">
                            <h4>오늘 학습 수</h4>
                            <strong>321회</strong>
                        </div>

                    </section>

                    <section className="member-section">

                        <div className="member-search">

                            <input
                                value={keyword}
                                onChange={(e) =>
                                    setKeyword(e.target.value)
                                }
                                placeholder="아이디 검색"
                            />

                            <button onClick={searchMember}>
                                검색
                            </button>

                        </div>

                        <table>

                            <thead>
                            <tr>
                                <th>번호</th>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>가입일</th>
                                <th>권한</th>
                                <th>관리</th>
                            </tr>
                            </thead>

                            <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>회원 목록이 없습니다.</td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr key={member.memberId}>
                                        <td>{member.memberId}</td>
                                        <td>{member.loginId}</td>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.createdAt}</td>
                                        <td>{member.role}</td>
                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteMember(member.memberId)}
                                            >
                                                삭제
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>

                        </table>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default AdminPage;