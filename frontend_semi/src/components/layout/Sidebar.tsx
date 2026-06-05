import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  let menuList = [];

  if (location.pathname.startsWith("/notice")) {
    menuList = [
      { title: "전체공지", path: "/notice" },
      { title: "중요공지", path: "/notice/important" },
      { title: "업데이트", path: "/notice/update" },
    ];
  }

  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        {menuList.map((menu, index) => {
          const isActive = location.pathname === menu.path;

          return (
            <Link
              to={menu.path}
              className={`sidebar-link ${isActive ? "active" : ""}`}
              key={index}
            >
              {menu.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;