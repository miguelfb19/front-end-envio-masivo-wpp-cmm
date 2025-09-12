import { Alert, Button } from "@chakra-ui/react";
import { X } from "lucide-react";

interface AlertComponentProps {
  status?: "error" | "info" | "success" | "warning" | "neutral";
  title?: string | null;
  message: string;
  closeButton?: boolean;
  autoClose?: boolean;
  isFloating?: boolean;
  onClose?: () => void;
}

export const AlertComponent = ({
  status = "neutral",
  title,
  message,
  closeButton,
  autoClose = true,
  isFloating = false,
  onClose,
}: AlertComponentProps) => {
  if (autoClose) {
    setTimeout(() => {
      onClose?.();
    }, 8000);
  }

  return (
    <Alert.Root
      status={status}
      className={`animation-slide-in-top text-left ${
        isFloating
          ? "absolute top-5 left-1/2 -translate-x-[55%] z-50 w-auto max-w-lg mx-4"
          : "my-10 relative"
      }`}
    >
      {closeButton && (
        <div className="absolute top-2 right-2">
          <Button variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>
      )}
      <Alert.Indicator />
      <Alert.Content>
        {title && <Alert.Title>{title}</Alert.Title>}
        <Alert.Description>{message}</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
};
