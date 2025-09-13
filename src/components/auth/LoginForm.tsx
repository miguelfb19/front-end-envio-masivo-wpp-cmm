import {
  Stack,
  Field,
  Input,
  Button,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AlertComponent } from "../ui/AlertComponent";

const authSecret = import.meta.env.VITE_REACT_AUTH_SECRET;
interface FormValues {
  user: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);

  const authSecretStorage = localStorage.getItem("auth_secret");
  if (
    authSecretStorage &&
    authSecretStorage !== null &&
    authSecretStorage !== "null" &&
    authSecretStorage !== "undefined" &&
    authSecretStorage !== ""
  ) {
    return <Navigate to="/" replace/>;
  }

  const onLogin = (data: FormValues) => {
    if (
      data.user === import.meta.env.VITE_REACT_AUTORIZHED_USER &&
      data.password === import.meta.env.VITE_REACT_USER_PASSWORD
    ) {
      localStorage.setItem("auth_secret", authSecret);
      navigate("/", { replace: true });
      return;
    }

    setHasLoginError(true);
  };

  return (
    <div className="layout-center justify-center">
      <form
        onSubmit={handleSubmit(onLogin)}
        className="rounded-lg shadow-lg bg-white p-10 self-center w-full md:w-1/2"
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center">Iniciar sesión</h2>
        <Stack gap="2" align="flex-start" className="w-full mt-10">
          <Field.Root invalid={!!errors.user}>
            <Field.Label htmlFor="user">Usuario</Field.Label>
            <InputGroup startElement={<User />}>
              <Input
                id="user"
                colorPalette="blue"
                variant="subtle"
                css={{ "--border": "red" }}
                {...register("user", { required: "Este campo es requerido" })}
              />
            </InputGroup>
            <Field.ErrorText>{errors.user?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label htmlFor="password">Contraseña</Field.Label>
            <InputGroup
              startElement={<Lock />}
              endElement={
                <RevealPasswordButton onClick={() => setRevealed(!revealed)} />
              }
            >
              <Input
                id="password"
                colorPalette="blue"
                variant="subtle"
                type={revealed ? "text" : "password"}
                {...register("password", {
                  required: "Este campo es requerido",
                })}
              />
            </InputGroup>
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Button variant="solid" colorPalette="blue" type="submit">
            Ingresar
          </Button>
        </Stack>
        {hasLoginError && (
          <AlertComponent
            status="error"
            title="Error"
            message="Usuario o contraseña incorrecta"
            onClose={() => setHasLoginError(false)}
            closeButton
          />
        )}
      </form>
    </div>
  );
};

interface RevealButtonProps {
  onClick: () => void;
}

const RevealPasswordButton = ({ onClick }: RevealButtonProps) => {
  const [revealed, setRevealed] = useState(false);

  const OnReveal = () => {
    setRevealed(!revealed);
    onClick();
  };

  return (
    <IconButton onClick={OnReveal}>
      {revealed ? <EyeOff /> : <Eye />}
    </IconButton>
  );
};
