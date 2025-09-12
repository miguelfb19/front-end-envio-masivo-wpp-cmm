// theme.js

import { createSystem, defaultConfig } from "@chakra-ui/react";

// Puedes desactivar reset/preflight y eliminar globalCss:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { globalCss: _, ...restConfig } = defaultConfig;

const system = createSystem(restConfig, {
  // esta opción desactiva las capas de CSS que aplican global / reset
  preflight: false,
  disableLayers: true,
});

export { system };
