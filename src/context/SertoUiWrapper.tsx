import React from "react";
import { SertoUiProvider, SertoUiContextInterface } from "serto-ui";

import { useAuth } from "../services/useAuth";
import { config } from "../config";

export interface SertoUiWrapperProps {
  navItems: SertoUiContextInterface["navItems"];
}

export const SertoUiWrapper: React.FunctionComponent<SertoUiWrapperProps> = (props) => {
  const { jwt, userData } = useAuth();

  const sertoUiContext = {
    navItems: props.navItems,
    schemasUiUrl: config.UI_URL,
  };

  return (
    <SertoUiProvider
      schemasApiJwt={jwt}
      schemasApiUrl={config.API_URL}
      schemasApiUserData={userData}
      context={sertoUiContext}
    >
      {props.children}
    </SertoUiProvider>
  );
};
