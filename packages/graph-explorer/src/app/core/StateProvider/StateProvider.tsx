import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import StateDebug from "./StateDebug";

const StateProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  return (
    <RecoilRoot>
      {/* <StateDebug /> */}
      {children}
    </RecoilRoot>
  );
};

export default StateProvider;
