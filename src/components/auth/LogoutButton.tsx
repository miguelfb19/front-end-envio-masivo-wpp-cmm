import { Button } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("auth_secret", "null");
    navigate("/login", { replace: true });
  };

  return (
    <Button colorPalette="red" size="sm" className="w-fit" onClick={handleLogout}>
      <LogOut />
    </Button>
  );
};
