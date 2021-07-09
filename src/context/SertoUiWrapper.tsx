import React from "react";
import { SertoUiProvider, SertoUiContextInterface } from "serto-ui";

import { useAuth } from "../services/useAuth";
import { config } from "../config";

export interface SertoUiWrapperProps {
  navItems: SertoUiContextInterface["navItems"];
}

export const SertoUiWrapper: React.FunctionComponent<SertoUiWrapperProps> = (props) => {
  const { jwt } = useAuth();

  const sertoUiContext = {
    navItems: props.navItems,
    schemasUiUrl: window.location.origin,
  };

  return (
    <SertoUiProvider schemasApiJwt={jwt} schemasApiUrl={config.API_URL} context={sertoUiContext}>
      {props.children}
    </SertoUiProvider>
  );
};
