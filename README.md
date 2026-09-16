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

### Alternativa: editar "de oído" (sin video de referencia)

Si lo que querés es simplemente que se saque el aire muerto de un video
tuyo (silencios/pausas) y quede tu parte hablada de corrido — el clásico
edit de podcast/talking-head — no hace falta ningún video de referencia:

```bash
python3 scripts/edit_from_speech.py media/footage/tu_video.mp4
```

Esto detecta las pausas con `ffmpeg` (sin descargar ningún modelo) y genera
el mismo `EditPlan.json` que después renderiza Remotion.

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
# (si eso falla en tu entorno, usá el workaround del script:)
./scripts/render.sh
```

## Edit "a mano" con Remotion (composición `CoachFitnessAd`)

Además del pipeline automático de arriba, `remotion/src/coachEdit/` tiene un
edit vertical (9:16, vale para cualquier ad de este estilo) armado a mano
componente por componente: jump cuts sin pausas muertas (a partir de
`ffmpeg silencedetect` sobre el audio real, no estimado), subtítulos cortos
animados (blur + scale-in + click sincronizado), placas de impacto
full-screen, motion graphics (flujo VOS→IA→CLIENTE, niveles de precio,
"boca a boca", CTA P2P, tarjeta de mini clase) y flashes/destellos en los
cortes de sección. Todo el timing vive en `remotion/src/coachEdit/timeline.ts`,
con un comentario al principio explicando cómo se calculó.

Para reproducirlo:

```bash
# 1) Poné tu video en remotion/public/footage/ y ajustá SOURCE_VIDEO en
#    remotion/src/coachEdit/timeline.ts (y los cortes/tiempos si es un video
#    distinto al que se usó para armar este edit)

# 2) Generá los efectos de sonido (no se commitean como binarios)
./scripts/generate_sfx.sh

# 3) Preview / render
cd remotion && npm install
npx remotion studio      # preview interactivo, composición "CoachFitnessAd"
npx remotion render CoachFitnessAd out/final.mp4
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
- ✅ Render final probado de punta a punta con un video de referencia real
  (47s, 43 cortes) y un clip crudo, produciendo `out/final_edit.mp4` con la
  misma duración y ritmo que la referencia.
- El render final (`npx remotion render`) requiere descargar Chrome Headless
  Shell la primera vez; en este entorno de nube esa descarga está bloqueada
  por la política de red. Además, en este sandbox el bundling interno del
  CLI (que corre en paralelo con el arranque del browser) a veces no
  terminaba de escribir `bundle.js` a tiempo, causando un 404 al pedirlo.
  `scripts/render.sh` evita ambos problemas: bundlea a una carpeta fija,
  la sirve con un HTTP server simple, y renderiza apuntando a esa URL en
  vez de dejar que el CLI bundlee y sirva todo internamente. En tu propia
  máquina, con salida a internet normal, probablemente ni haga falta —
  `npx remotion render` debería andar directo.
