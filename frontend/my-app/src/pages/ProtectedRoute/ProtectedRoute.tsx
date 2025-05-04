import React from "react"; // <-- Добавляем это чтобы JSX.Element понимался
import { useUserStore } from "@store/UserStore";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.JSX.Element;
  guestOnly?: boolean;
  roles?: Array<"HEAD" | "CLIENT" | "DRIVER" | "USER" | "ADMIN">;
}

const ProtectedRoute = ({ children, guestOnly = false, roles }: ProtectedRouteProps) => {
  const userStore = useUserStore();

  // Если страница только для гостей, а пользователь залогинен
  if (guestOnly && userStore.isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  // Если защищённая страница, а пользователь не залогинен
  if (!guestOnly && !userStore.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Проверка роли
  if (roles && userStore.user && !roles.includes(userStore.user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
