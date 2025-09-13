import { titleTemplateOptions, titleTemplates } from "@/constants";
import { useMobileStore } from "@/store/mobile-store";
import { Input, NativeSelect, Textarea } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { SegmentControl } from "../ui/SegmentControl";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

export interface MessageFormValues {
  title: string;
  hour: string;
  idVideo: string;
  message: string;
  template: string;
}

export interface MessageFormRef {
  getFormData: () => MessageFormValues;
  validateForm: () => Promise<boolean>;
  submitForm: () => Promise<MessageFormValues | null>;
}

export interface MessageFormProps {
  hasTitle?: boolean;
  hasHour?: boolean;
  hasIdVideo?: boolean;
  hasMessage?: boolean;
  onFormChange?: (data: Partial<MessageFormValues>, isValid: boolean) => void;
  onFormSubmit?: (data: MessageFormValues) => void;
}

export const MessageForm = forwardRef<MessageFormRef, MessageFormProps>(
  (
    {
      hasTitle = true,
      hasHour = true,
      hasIdVideo = true,
      hasMessage = true,
      onFormChange,
      onFormSubmit,
    },
    ref
  ) => {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
      null
    );

    const {
      register,
      control,
      watch,
      trigger,
      getValues,
      formState: { errors, isValid },
    } = useForm<MessageFormValues>({
      mode: "onChange",
      defaultValues: {
        title: "",
        hour: "",
        idVideo: "",
        message: "",
        template: titleTemplateOptions[0],
      },
    });

    const { isMobile } = useMobileStore();

    const templateValue = watch("template");
    const formValues = watch();

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      getFormData: () => getValues(),
      validateForm: async () => {
        return await trigger();
      },
      submitForm: async () => {
        const isFormValid = await trigger();
        if (isFormValid) {
          const data = getValues();
          onFormSubmit?.(data);
          return data;
        }
        return null;
      },
    }));

    // Update selectedTemplate when templateValue changes
    useEffect(() => {
      setSelectedTemplate(templateValue);
    }, [templateValue]);

    // Notify parent of form changes
    useEffect(() => {
      onFormChange?.(formValues, isValid);
    }, [formValues, isValid, onFormChange]);

    return (
      <div>
        <h2 className="col-span-1 md:col-span-2 text-2xl font-bold text-center mb-5 text-blue-600">
          MENSAJE
        </h2>

        {hasTitle && (
          <div className="flex flex-col text-left w-fit">
            <label htmlFor="template">Plantilla de titulo:</label>
            <Controller
              name="template"
              control={control}
              render={({ field }) => (
                <SegmentControl
                  id="template"
                  items={titleTemplateOptions}
                  getValue={(value) => field.onChange(value)}
                  defaultValue={field.value}
                  className="mb-10 mt-5"
                />
              )}
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {hasTitle && (
            <div className="flex flex-col gap-4 text-left">
              <label htmlFor="titulo">Titulo:</label>
              <div>
                <NativeSelect.Root size={isMobile ? "sm" : "md"}>
                  <NativeSelect.Field
                    id="titulo"
                    placeholder="Selecciona una seminario"
                    colorPalette={errors.title ? "red" : "blue"}
                    color={errors.title ? "red.600" : ""}
                    {...register("title", { required: hasTitle })}
                  >
                    {titleTemplates
                      .filter(
                        (template) => template.value === selectedTemplate
                      )[0]
                      ?.titles.map((seminario) => (
                        <option key={seminario} value={seminario}>
                          {seminario}
                        </option>
                      ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                {errors.title && (
                  <div className="text-red-600 text-xs">
                    Este campo es obligatorio.
                  </div>
                )}
              </div>
            </div>
          )}
          {hasHour && (
            <div className="flex flex-col gap-4 text-left w-fit">
              <label htmlFor="hora">Hora:</label>
              <div>
                <NativeSelect.Root size={isMobile ? "sm" : "md"}>
                  <NativeSelect.Field
                    id="hora"
                    placeholder="Selecciona una seminario"
                    colorPalette={errors.hour ? "red" : "blue"}
                    color={errors.hour ? "red.600" : ""}
                    {...register("hour", { required: hasHour })}
                  >
                    <option value="3PM">3PM (Manizales)</option>
                    <option value="7PM">7PM (Pereira)</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                {errors.hour && (
                  <div className="text-red-600 text-xs">
                    Este campo es obligatorio.
                  </div>
                )}
              </div>
            </div>
          )}
          {hasIdVideo && (
            <div className="flex flex-col gap-4 text-left">
              <label htmlFor="idVideo">Id de video:</label>
              <div>
                <Input
                  id="idVideo"
                  {...register("idVideo", { required: hasIdVideo })}
                  colorPalette={errors.idVideo ? "red" : "blue"}
                  color={errors.idVideo ? "red.600" : ""}
                  variant="subtle"
                  size={isMobile ? "sm" : "md"}
                  placeholder="Ejemplo: dQw4w9WgXcQ"
                />
                {errors.idVideo && (
                  <div className="text-red-600 text-xs">
                    Este campo es obligatorio.
                  </div>
                )}
              </div>
            </div>
          )}
          {hasMessage && (
            <div className="flex flex-col gap-4 text-left">
              <label htmlFor="message">Mensaje personalizado:</label>
              <div>
                <Textarea
                  id="message"
                  {...register("message", { required: hasMessage })}
                  colorPalette={errors.message ? "red" : "blue"}
                  color={errors.message ? "red.600" : ""}
                  variant="subtle"
                  size={isMobile ? "sm" : "md"}
                  placeholder="Escribe tu mensaje..."
                  rows={4}
                  maxHeight={150}
                  minHeight={50}
                />
                {errors.message && (
                  <div className="text-red-600 text-xs">
                    Este campo es obligatorio.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MessageForm.displayName = "MessageForm";
