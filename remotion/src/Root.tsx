import "./index.css";
import { MyComposition } from "./Composition";
import { AutoEditComposition } from "./AutoEdit";
import { CoachFitnessEditComposition } from "./coachEdit/CoachFitnessEdit";
import { JoanP2PEditComposition } from "./joanEdit/JoanP2PEdit";
import { DylanTestimonialEditComposition } from "./dylanEdit/DylanTestimonialEdit";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <AutoEditComposition />
      <CoachFitnessEditComposition />
      <JoanP2PEditComposition />
      <DylanTestimonialEditComposition />
    </>
  );
};
