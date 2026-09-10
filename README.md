# Claude-Joan — Editor de video automático (mismo estilo que tu referencia)

Este proyecto analiza un video ya editado (tu "referencia de estilo") y arma
un nuevo video con tu material crudo, replicando el ritmo de cortes de esa
referencia. Usa [Remotion](https://www.remotion.dev/) para el render final.

## Cómo funciona

1. **Analizar la referencia** (`scripts/analyze_reference.py`): usa `ffmpeg`
   para detectar cada corte de escena (timestamps exactos) y `whisper` para
   transcribir el audio con marcas de tiempo. Genera un `*.style.json` con
   la duración de cada plano y la transcripción.
2. **Armar el edit** (`scripts/build_edit.py`): toma ese `style.json` +
   tus videos crudos (`media/footage/`) y genera `remotion/src/data/EditPlan.json`,
   asignando un segmento de tu material a cada plano de la referencia,
   respetando la misma duración/ritmo de corte.
3. **Renderizar** (`remotion/`): la composición `AutoEdit` lee `EditPlan.json`
   y arma el video final, plano por plano, en el mismo orden y timing que la
   referencia.

## Uso

```bash
# 1) Poné tu video de referencia (el editado, con el estilo a copiar) en:
media/reference/tu_referencia.mp4

# 2) Poné tu material crudo (uno o varios archivos) en:
media/footage/

# 3) Analizá la referencia
python3 scripts/analyze_reference.py media/reference/tu_referencia.mp4

# 4) Armá el plan de edición con tu material
python3 scripts/build_edit.py media/reference/tu_referencia.style.json media/footage/

# 5) Instalá dependencias de Remotion (una sola vez)
cd remotion && npm install

# 6) Preview interactivo
npm run dev

# 7) Render final
npx remotion render AutoEdit out/final.mp4
```

## Requisitos

- `ffmpeg` / `ffprobe` (detección de cortes y metadata)
- Python 3 + `pip install openai-whisper` (transcripción de audio; opcional,
  si falla o no hay red el pipeline sigue sin transcripción)
- Node.js 18+ (Remotion)

## Estado actual / próximos pasos

- ✅ Detección de cortes de escena: probada y funcionando (timestamps exactos).
- ✅ Generación del `EditPlan.json` a partir de la referencia + material crudo.
- ✅ Composición de Remotion (`AutoEdit`) que reproduce ese plan.
- ⚠️ Estrategia de asignación de clips actual: **secuencial simple** (usa tus
  clips en orden, avanzando el punto de entrada). Si querés algo más
  inteligente (elegir el clip más parecido en contenido/color a cada plano
  de la referencia, sincronizar con la música, replicar transiciones/texto
  en pantalla), es el siguiente paso a construir una vez que tengamos
  ejemplos reales.
- El render final (`npx remotion render`) requiere descargar Chrome Headless
  Shell la primera vez; en este entorno de nube esa descarga está bloqueada
  por la política de red, así que el render de prueba se hizo apuntando a un
  Chromium ya instalado en el sandbox. En tu máquina (o en un entorno con
  salida a internet habilitada) `npx remotion render` debería funcionar sin
  pasos extra.
