import { Tabs } from "@chakra-ui/react";
import { Airplay, Image, TextAlignStart, Video } from "lucide-react";


import { useMobileStore } from "@/store/mobile-store";
import type { MessageFormValues } from "@/components/send-forms/MessageForm";
import { SetupForm, type SetupFormValues } from "@/components/send-forms/SetupForm";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Tooltip } from "@/components/ui/tooltip";



export const MainView = () => {
  const { isMobile } = useMobileStore();

  const getData = (data: SetupFormValues & MessageFormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <div id="main" className="p-5 pt-16 md:pt-5">
      <div className="w-fit h-fit absolute top-4 right-4">
        <LogoutButton />
      </div>
      <Tabs.Root
        defaultValue="seminario"
        variant="subtle"
        colorPalette={"blue"}
      >
        <Tabs.List className="justify-center self-center w-full">
          <Tooltip content="Seminario">
            <Tabs.Trigger value="seminario">
              <Airplay />
              {!isMobile && <span>Seminario</span>}
            </Tabs.Trigger>
          </Tooltip>
          <Tooltip content="General">
            <Tabs.Trigger value="general">
              <TextAlignStart />
              {!isMobile && <span>General</span>}
            </Tabs.Trigger>
          </Tooltip>
          <Tooltip content="Con Imagen">
            <Tabs.Trigger value="con-imagen">
              <Image />
              {!isMobile && <span>Con Imagen</span>}
            </Tabs.Trigger>
          </Tooltip>
          <Tooltip content="Con Video">
            <Tabs.Trigger value="con-video">
              <Video />
              {!isMobile && <span>Con Video</span>}
            </Tabs.Trigger>
          </Tooltip>
        </Tabs.List>

        {/* Contenido */}
        <Tabs.Content
          value="seminario"
          className="min-h-[50dvh] md:min-h-[90dvh]"
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "300ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "120ms",
          }}
        >
          <div
            id="container"
            className="rounded-lg shadow-lg bg-white p-5 md:p-10 self-center justify-self-center w-full lg:max-w-9/12 xl:max-w-8/12 overflow-auto"
          >
            <SetupForm
              messageFormProps={{
                hasTitle: true,
                hasHour: true,
                hasIdVideo: true,
                hasMessage: false,
              }}
              onSend={getData}
            />
          </div>
        </Tabs.Content>
        <Tabs.Content
          value="general"
          className="min-h-[50dvh] md:min-h-[90dvh]"
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "300ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "120ms",
          }}
        >
          <div
            id="container"
            className="rounded-lg shadow-lg bg-white p-5 md:p-10 self-center justify-self-center w-full lg:max-w-9/12 xl:max-w-8/12 overflow-auto"
          >
            <SetupForm
              messageFormProps={{
                hasTitle: false,
                hasHour: false,
                hasIdVideo: false,
                hasMessage: true,
              }}
              onSend={getData}
            />
          </div>
        </Tabs.Content>
        <Tabs.Content
          value="con-imagen"
          className="min-h-[50dvh] md:min-h-[90dvh]"
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "300ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "120ms",
          }}
        >
          <div
            id="container"
            className="rounded-lg shadow-lg bg-white p-5 md:p-10 self-center justify-self-center w-full lg:max-w-9/12 xl:max-w-8/12 overflow-auto"
          >
            <SetupForm
              messageFormProps={{
                hasTitle: false,
                hasHour: false,
                hasIdVideo: false,
                hasMessage: true,
              }}
              onSend={getData}
            />
          </div>
        </Tabs.Content>
        <Tabs.Content
          value="con-video"
          className="min-h-[50dvh] md:min-h-[90dvh]"
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "300ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "120ms",
          }}
        >
          <div
            id="container"
            className="rounded-lg shadow-lg bg-white p-5 md:p-10 self-center justify-self-center w-full lg:max-w-9/12 xl:max-w-8/12 overflow-auto"
          >
            <SetupForm
              messageFormProps={{
                hasTitle: false,
                hasHour: false,
                hasIdVideo: false,
                hasMessage: true,
              }}
              onSend={getData}
            />
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
