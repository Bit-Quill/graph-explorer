"use client";
import { version } from "../../../../package.json";
import { css } from "@emotion/css";
import { PropsWithChildren } from "react";
import GraphExplorerIcon from "../../components/icons/GraphExplorerIcon";
import Workspace from "../../components/Workspace";

const TopBarWithLogo = ({ children }: PropsWithChildren<any>) => {
  console.log(version);
  return (
    <Workspace.TopBar
      logoVisible={true}
      logo={<GraphExplorerIcon width={"2em"} height={"2em"} />}
      className={css`
        .ft-navbar-logo-container {
          background: linear-gradient(225deg, #4d72f2 12.15%, #3334b9 87.02%);
        }
      `}
    >
      {children}
      <Workspace.TopBar.Version>{version}</Workspace.TopBar.Version>
    </Workspace.TopBar>
  );
};

TopBarWithLogo.displayName = "WorkspaceTopBar";

export default TopBarWithLogo;
