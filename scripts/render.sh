#!/usr/bin/env bash
# Renderiza el video final (remotion/out/final_edit.mp4) a partir del
# EditPlan.json ya generado.
#
# En algunos entornos (sandboxes con red restringida) el flujo normal de
# `npx remotion render` falla porque el bundling interno del CLI, corriendo
# en paralelo con el arranque del browser, a veces no termina de escribir
# bundle.js a tiempo. El workaround: bundlear primero a una carpeta fija,
# servirla con un HTTP server simple, y renderizar apuntando a esa URL.
#
# Uso:
#   ./scripts/render.sh [navegador-opcional]
#
# Si no pasás navegador, usa el que encuentre `npx remotion` por defecto
# (baja Chrome Headless Shell la primera vez si hay salida a internet).
set -euo pipefail
cd "$(dirname "$0")/../remotion"

BROWSER_ARG=()
if [ -n "${1:-}" ]; then
  BROWSER_ARG=(--browser-executable="$1")
fi

rm -rf dist
# Nota: `npx remotion bundle` (el subcomando del CLI) resultó poco fiable en
# algunos entornos -- a veces terminaba "bien" pero sin escribir bundle.js.
# Llamar a la API de @remotion/bundler directamente es más confiable.
node -e "
const {bundle} = require('@remotion/bundler');
const path = require('path');
bundle({entryPoint: path.join(process.cwd(),'src/index.ts'), outDir: path.join(process.cwd(),'dist'), onProgress: ()=>{}})
  .then((out) => console.log('Bundled ->', out))
  .catch((err) => { console.error(err); process.exit(1); });
"

PORT=4400
python3 -m http.server "$PORT" --directory dist >/tmp/remotion-http-server.log 2>&1 &
SERVER_PID=$!
sleep 2
trap 'kill $SERVER_PID 2>/dev/null || true' EXIT

mkdir -p out
npx remotion render "http://localhost:$PORT" AutoEdit out/final_edit.mp4 "${BROWSER_ARG[@]}"

echo "Listo -> remotion/out/final_edit.mp4"
