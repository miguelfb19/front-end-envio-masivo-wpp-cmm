import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authSecret = localStorage.getItem("auth_secret");

  if (
    !authSecret ||
    authSecret === "null" ||
    authSecret === "undefined" ||
    authSecret === ""
  ) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
