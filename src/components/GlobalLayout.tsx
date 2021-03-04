import * as React from "react";
import { GlobalLayout as SertoUiGlobalLayout } from "serto-ui";
import { AuthButtons } from "../views/Auth/AuthButtons";

export interface GlobalLayoutProps {
  url: string;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  return (
    <SertoUiGlobalLayout url={props.url} sidebarBottomContents={<AuthButtons />}>
      {props.children}
    </SertoUiGlobalLayout>
  );
};
