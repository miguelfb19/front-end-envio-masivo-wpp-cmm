import { ciudades, horarios, seminarios } from "@/constants";
import { LogoutButton } from "../auth/LogoutButton";
import { SegmentControl } from "../ui/SegmentControl";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { useMobileStore } from "@/store/mobile-store";
import { AlertComponent } from "../ui/AlertComponent";

interface FormValues {
  seminario: string;
  ciudad: string;
  horario: string;
  idVideo: string;
  mensaje: string;
}

export const SendMessageForm = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      // Valores por defecto
      seminario: seminarios[0],
      ciudad: ciudades[0],
      horario: horarios[0],
      idVideo: "",
      mensaje: "",
    },
  });
  const { isMobile } = useMobileStore();

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    // Aquí puedes procesar los datos del formulario
  };

  return (
    <div className="">
      <div className="w-fit h-fit absolute top-4 right-4 bg-red-600/20 p-2 rounded">
        <LogoutButton />
      </div>
      {Object.keys(errors).length > 0 && (
        <AlertComponent
          status="error"
          message="Por favor, completa todos los campos requeridos."
          isFloating
        />
      )}
      <div id="container">
        <div className="rounded-lg shadow-lg bg-white p-5 md:p-10 self-center w-full md:w-auto overflow-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <h2 className="text-2xl font-bold text-blue-600">Enviar Mensaje</h2>
            <div
              id="form-grid"
              className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center text-center text-slate-700"
            >
              <div className="flex flex-col gap-4 text-left w-fit">
                <label htmlFor="seminario">Seminario:</label>
                <Controller
                  name="seminario"
                  control={control}
                  render={({ field }) => (
                    <SegmentControl
                      items={seminarios}
                      getValue={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 text-left w-fit">
                <label htmlFor="ciudad">Ciudad:</label>
                <Controller
                  name="ciudad"
                  control={control}
                  render={({ field }) => (
                    <SegmentControl
                      items={ciudades}
                      getValue={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 text-left w-fit">
                <label htmlFor="horario">Horario:</label>
                <Controller
                  name="horario"
                  control={control}
                  render={({ field }) => (
                    <SegmentControl
                      items={horarios}
                      getValue={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 text-left w-fit">
                <label htmlFor="idVideo">Id de video:</label>
                <Input
                  {...register("idVideo", { required: true })}
                  color="blue.600"
                  variant="subtle"
                  size={isMobile ? "sm" : "md"}
                  placeholder="Ejemplo: dQw4w9WgXcQ"
                />
              </div>
              <div className="flex flex-col gap-4 text-left md:col-span-2">
                <label htmlFor="mensaje">Mensaje:</label>
                <Textarea
                  {...register("mensaje", { required: true })}
                  color="blue.600"
                  variant="subtle"
                  size={isMobile ? "sm" : "md"}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={4}
                  maxHeight={200}
                  minHeight={50}
                />
              </div>
            </div>
            <Button type="submit" colorPalette="blue">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
