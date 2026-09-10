import {
  CalculateMetadataFunction,
  Composition,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import editPlan from "./data/EditPlan.json";

type Clip = {
  file: string;
  trimStart: number;
  duration: number;
  durationInFrames: number;
};

type EditPlan = {
  fps: number;
  width: number;
  height: number;
  totalDurationInFrames: number;
  clips: Clip[];
};

const plan = editPlan as EditPlan;

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = async () => {
  return {
    fps: plan.fps || 30,
    width: plan.width || 1280,
    height: plan.height || 720,
    durationInFrames: Math.max(plan.totalDurationInFrames || 0, 1),
  };
};

export const AutoEditComposition = () => {
  return (
    <Composition
      id="AutoEdit"
      component={AutoEdit}
      durationInFrames={Math.max(plan.totalDurationInFrames || 90, 1)}
      fps={plan.fps || 30}
      width={plan.width || 1280}
      height={plan.height || 720}
      calculateMetadata={calculateMetadata}
    />
  );
};

// Renderiza los clips uno detrás de otro, respetando el ritmo de cortes
// (durationInFrames por plano) y el punto de entrada (trimStart) que calculó
// scripts/build_edit.py a partir del video de referencia.
export const AutoEdit: React.FC<Props> = () => {
  let cursor = 0;
  return (
    <>
      {plan.clips.map((clip, i) => {
        const from = cursor;
        cursor += clip.durationInFrames;
        return (
          <Sequence key={i} from={from} durationInFrames={clip.durationInFrames}>
            <OffthreadVideo
              src={staticFile(clip.file)}
              startFrom={Math.round(clip.trimStart * plan.fps)}
              muted={false}
            />
          </Sequence>
        );
      })}
    </>
  );
};
