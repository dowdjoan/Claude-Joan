import "./index.css";
import { MyComposition } from "./Composition";
import { AutoEditComposition } from "./AutoEdit";
import { CoachFitnessEditComposition } from "./coachEdit/CoachFitnessEdit";
import { JoanP2PEditComposition } from "./joanEdit/JoanP2PEdit";
import { DylanTestimonialEditComposition } from "./dylanEdit/DylanTestimonialEdit";
import { DylanShortEditComposition } from "./dylanShortEdit/DylanShortEdit";
import { FeliEditComposition } from "./feliEdit/FeliEdit";
import { FeliTestimonialEditComposition } from "./feliTestimonialEdit/FeliTestimonialEdit";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <AutoEditComposition />
      <CoachFitnessEditComposition />
      <JoanP2PEditComposition />
      <DylanTestimonialEditComposition />
      <DylanShortEditComposition />
      <FeliEditComposition />
      <FeliTestimonialEditComposition />
    </>
  );
};
