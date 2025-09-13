import { horarios, modalidades, seminarios } from "@/constants";
import { SegmentControl } from "../ui/SegmentControl";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, NativeSelect } from "@chakra-ui/react";
import { useMobileStore } from "@/store/mobile-store";
import { capitalizeWord } from "@/utils/capitalize";
import { casos } from "../../constants/index";
import {
  MessageForm,
  type MessageFormRef,
  type MessageFormProps,
  type MessageFormValues,
} from "./MessageForm";
import { useRef, useState } from "react";

export interface SetupFormValues {
  destino: string;
  horario: string;
  modalidad: string;
  casos: string;
}

interface Props {
  messageFormProps: MessageFormProps;
  onSend?: (data: SetupFormValues & MessageFormValues) => void;
}

export const SetupForm = ({ messageFormProps, onSend }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageFormErrors, setMessageFormErrors] = useState<boolean>(false);
  const [isCustomDestiny, setIsCustomDestiny] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<SetupFormValues>({
    defaultValues: {
      // Valores por defecto
      destino: undefined,
      horario: horarios[0],
      modalidad: modalidades[0],
      casos: casos[0],
    },
  });
  const { isMobile } = useMobileStore();
  const messageFormRef = useRef<MessageFormRef>(null);

  const onSubmit = async (data: SetupFormValues) => {
    setIsSubmitting(true);
    setMessageFormErrors(false);

    try {
      // Validar el MessageForm primero
      const isMessageFormValid = await messageFormRef.current?.validateForm();

      if (!isMessageFormValid || messageFormRef.current == null) {
        setMessageFormErrors(true);
        setIsSubmitting(false);
        return;
      }

      // Si está válido, obtener los datos y procesarlos
      const messageFormData = messageFormRef.current.getFormData();
      const formData = {
        ...data,
        ...messageFormData,
      };

      onSend?.(formData);
      // Aquí puedes procesar los datos del formulario
    } catch (error) {
      console.error("Error al validar el formulario:", error);
      setMessageFormErrors(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageFormChange = (
    _data: Partial<MessageFormValues>,
    isValid: boolean
  ) => {
    // Si hay errores y el form se vuelve válido, limpiar el estado de error
    if (messageFormErrors && isValid) {
      setMessageFormErrors(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <h2 className="text-2xl font-bold text-blue-600 text-center">
        CONFIGURACIÓN DEL MENSAJE
      </h2>
      <div
        id="form-grid"
        className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center text-center text-slate-700"
      >
        <div className={`flex flex-col gap-4 text-left ${isCustomDestiny ? "w-full" : "w-fit"}`}>
          <label htmlFor="seminario">Destino:</label>
          <div>
            {isCustomDestiny ? (
              <Input
                id="idVideo"
                {...register("destino", { required: isCustomDestiny })}
                colorPalette={errors.destino ? "red" : "blue"}
                color={errors.destino ? "red.600" : ""}
                variant="subtle"
                size={isMobile ? "sm" : "md"}
                placeholder="Escriba los números separados por comas"
              />
            ) : (
              <NativeSelect.Root size={isMobile ? "sm" : "md"}>
                <NativeSelect.Field
                  id="seminario"
                  placeholder="Selecciona una seminario"
                  colorPalette={errors.destino ? "red" : "blue"}
                  color={errors.destino ? "red.600" : ""}
                  {...register("destino", { required: !isCustomDestiny })}
                >
                  {seminarios.map((seminario) => (
                    <option key={seminario} value={seminario}>
                      {capitalizeWord(seminario).replaceAll("-", " ")}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            )}
            {errors.destino && (
              <div className="text-red-600 text-xs">
                Este campo es obligatorio.
              </div>
            )}
            <div className="mt-2 flex gap-2 items-center">
              <input
                type="checkbox"
                name="customDestiny"
                id="customDestiny"
                className="w-4 h-4 cursor-pointer"
                checked={isCustomDestiny}
                onChange={(e) => setIsCustomDestiny(e.target.checked)}
              />
              <label htmlFor="customDestiny">Destino personalizado</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-left w-fit">
          <label htmlFor="horario">Horario:</label>
          <Controller
            name="horario"
            control={control}
            render={({ field }) => (
              <SegmentControl
                id="horario"
                items={horarios}
                getValue={(value) => field.onChange(value)}
                defaultValue={field.value}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4 text-left w-fit">
          <label htmlFor="modalidad">Modalidad:</label>
          <Controller
            name="modalidad"
            control={control}
            render={({ field }) => (
              <SegmentControl
                id="modalidad"
                items={modalidades}
                getValue={(value) => field.onChange(value)}
                defaultValue={field.value}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4 text-left w-fit">
          <label htmlFor="casos">Casos:</label>
          <Controller
            name="casos"
            control={control}
            render={({ field }) => (
              <SegmentControl
                id="casos"
                items={casos}
                getValue={(value) => field.onChange(value)}
                defaultValue={field.value}
              />
            )}
          />
        </div>
      </div>
      <MessageForm
        ref={messageFormRef}
        onFormChange={handleMessageFormChange}
        {...messageFormProps}
      />
      <Button
        type="submit"
        colorPalette="blue"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
};
