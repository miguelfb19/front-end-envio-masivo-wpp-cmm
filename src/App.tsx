import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/auth/LoginForm";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useEffect } from "react";
import { useMobileStore } from "./store/mobile-store";
import { Main } from "./components/main/Main";

function App() {

  const { setIsMobile, isMobile } = useMobileStore();

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 850);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [isMobile, setIsMobile]);

  return (
    <div className="layout-center">
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
