import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { User } from "../../types/User";

interface ProtectedLayoutProps {
  user: User | null;
}

function ProtectedLayout({ user }: ProtectedLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("accessToken");

  const isLoggedIn = user !== null || token !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");

      navigate("/api/members/login", {
        replace: true,
        state: {
          from: location.pathname + location.search,
        },
      });
    }
  }, [isLoggedIn, navigate, location.pathname, location.search]);

  if (!isLoggedIn) {
    return null;
  }

  return <Outlet />;
}

export default ProtectedLayout;