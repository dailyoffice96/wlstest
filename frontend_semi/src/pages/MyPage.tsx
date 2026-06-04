import { useEffect, useState } from "react";
import MyPageSideBar from "../components/layout/MyPageSideBar";
import "./MyPage.css"
import axios from "axios";

type MemberInfo = {
    loginId: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    learningProfile: number[];
}

function MyPage() {
    const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [memberPassword, setMemberPassword] = useState("");
    const [memberPasswordConfirm, setMemberPasswordConfirm] = useState("");
    
    let isPasswordMatch = false;

    const profileNameMap: Record<number, string> = {
        1: "FRONT",
        2: "BACK",
        3: "웹 서비스",
        4: "UI",
    };

    const profileText = memberInfo?.learningProfile && memberInfo?.learningProfile.length > 0
                ? memberInfo.learningProfile
                        .map((id)=> profileNameMap[id])
                        .filter((name)=> name!== undefined)
                        .join(",")
            : "선택한 관심 학습 분야가 없습니다.";

    const getMemberInfo = async () => {
        try{
            const token = localStorage.getItem("accessToken");

            const response = await axios.get("http://localhost:9000/api/members/me",
            { headers: {
                Authorization: `Bearer ${token}`
            }
            });  
            console.log("회원정보 응답 : ", response.data);

            setMemberInfo(response.data);
        } catch(error){
                console.error("회원정보 조회 실패:", error);
                alert("회원정보를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };
        useEffect(()=>{
            getMemberInfo();
        }, []);
    if(loading){
        return <div className="mypage-main">회원정보를 불러오는 중입니다...</div>;
    }

    if(memberInfo === null) {
        return <div className="mypage-main">회원정보가 없습니다!</div>;
    }

    const handlePasswordCheck = () => {

    }

    const handlePasswordChange= () => {
        
    }

    return(
        <div className="mypage-page">
            <MyPageSideBar /> 
             <main className="mypage-main">
                <section className="mypage-panel">
                <h1>회원정보</h1>
                <div>
                    <span>아이디</span>
                    <input
                        className="member-info-input"
                        type="text"
                        value={memberInfo.loginId}
                        readOnly>
                    </input>
                </div>
                <div>
                    <span>이름</span>
                    <input
                        className="member-info-input"
                        type="text"
                        value={memberInfo.name}
                        readOnly>
                    </input>
                </div>
                <div>
                    <span>비밀번호</span>
                    <input
                        className="member-info-input"
                        type="password"
                        value={memberPassword}
                        onChange={(event)=>setMemberPassword(event.target.value)}>
                    </input>
                    <span>비밀번호 확인</span>
                    <input
                        className="member-info-input"
                        type="passwordConfirm"
                        value={memberPasswordConfirm}
                        onChange={(event)=>setMemberPasswordConfirm(event.target.value)}>
                    </input>
                    <button>확인</button>
                </div>
                <div>
                    <span>이메일</span>
                    <input
                        className="member-info-input"
                        type="text"
                        value={memberInfo.email}
                        readOnly>
                    </input>
                </div>
                <div>
                    <span>전화번호</span>
                    <input
                        className="member-info-input"
                        type="text"
                        value={memberInfo.phone}
                        readOnly>
                    </input>
                </div>                
                <div>
                    <span>생년월일</span>
                    <input
                        className="member-info-input"
                        type="text"
                        value={memberInfo.birthDate}
                        readOnly>
                    </input>
                </div>
                <div>
                    <span>관심학습분야</span>
                    <strong>{profileText}</strong>
                </div>                
                </section>
             </main>
        </div>          
    );

}

export default MyPage;