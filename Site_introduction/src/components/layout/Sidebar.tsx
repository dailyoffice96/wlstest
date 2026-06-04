import { Link, useLocation } from 'react-router-dom';

import {
    FiUser,
    FiBookOpen,
    FiMonitor,
    FiInfo,
    FiCheckCircle,
    FiLayers,
    FiHelpCircle,
    FiMessageCircle,
    FiAward,
    FiTrendingUp
} from "react-icons/fi";

import "./Sidebar.css";

function Sidebar() {
    const location = useLocation();

    let titleText = "플랫폼 안내";

    let menuList = [];

    if (
        location.pathname.startsWith("/company") ||
        location.pathname.startsWith("/guide") ||
        location.pathname.startsWith("/teacher")
    ) {
        menuList = [
            {
                title: "사이트 소개1",
                path: "/company/1",
                icon: <FiUser />
            },
            {
                title: "사이트 소개2",
                path: "/company/2",
                icon: <FiBookOpen />
            },
            {
                title: "사이트 소개3",
                path: "/company/3",
                icon: <FiMonitor />
            },
            {
                title: "이용 방법1",
                path: "/guide/1",
                icon: <FiInfo />
            },
            {
                title: "이용 방법2",
                path: "/guide/2",
                icon: <FiCheckCircle />
            },
            {
                title: "이용 방법3",
                path: "/guide/3",
                icon: <FiLayers />
            },
            {
                title: "선생님 소개1",
                path: "/teacher/1",
                icon: <FiAward />
            },
            {
                title: "선생님 소개2",
                path: "/teacher/2",
                icon: <FiTrendingUp /> // 칠판/강의 아이콘
            }
        ];
    }

    return (
        <aside className="sidebar">

            <div className="sidebar-top">
                <h1 className="sidebar-title">
                    {titleText}
                </h1>

                <div className="sidebar-divider" />

                <nav className="sidebar-menu">
                    {menuList.map((menu, index) => {
                        const isActive = location.pathname === menu.path;

                        return (
                            <Link
                                to={menu.path}
                                className={`sidebar-link ${isActive ? "active" : ""}`}
                                key={index}
                            >
                                <span className="sidebar-icon">
                                    {menu.icon}
                                </span>

                                <span className="sidebar-text">
                                    {menu.title}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="sidebar-bottom">
                <div className="info-card">
                    <div className="info-row">
                        <span className="info-icon">
                            <FiHelpCircle />
                        </span>

                        <p>
                            STUDY PORTAL은<br />
                            ICT 실무 역량을 키우는<br />
                            온라인 학습 플랫폼입니다.
                        </p>
                    </div>

                </div>
            </div>

        </aside>
    );
}

export default Sidebar;