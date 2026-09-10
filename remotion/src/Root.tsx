import "./index.css";
import { MyComposition } from "./Composition";
import { AutoEditComposition } from "./AutoEdit";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <AutoEditComposition />
    </>
  );
};
