import { Button } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "../ui/tooltip";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("auth_secret", "null");
    navigate("/login", { replace: true });
  };

  return (
    <Tooltip content="Cerrar sesión">
      <Button
        colorPalette="red"
        size="sm"
        className="w-fit z-10"
        onClick={handleLogout}
      >
        <LogOut />
      </Button>
    </Tooltip>
  );
};
