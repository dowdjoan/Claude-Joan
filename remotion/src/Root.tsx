import "./index.css";
import { MyComposition } from "./Composition";
import { AutoEditComposition } from "./AutoEdit";
import { CoachFitnessEditComposition } from "./coachEdit/CoachFitnessEdit";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <AutoEditComposition />
      <CoachFitnessEditComposition />
    </>
  );
};
