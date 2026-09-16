/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

// Rspack roto en este sandbox: `remotion render`/`still` fallan con
// "ENOENT .../bundle.js" al bundlear con Config.setRspack(true) (el bundle
// standalone `remotion bundle` sí funciona, pero el bundler interno de
// render/still no encuentra el archivo). Webpack (default) funciona bien.
Config.setRspack(false);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);
