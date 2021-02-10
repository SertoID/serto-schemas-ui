import React from "react";
import { SertoUiProvider, SertoUiContextInterface } from "serto-ui";

import { TrustAgencyContext } from "./TrustAgentProvider";
import { TrustAgencyService } from "../services/TrustAgencyService";
import { config } from "../config";

export interface SertoUiWrapperProps {
  navItems: SertoUiContextInterface["navItems"];
}

export const SertoUiWrapper: React.FunctionComponent<SertoUiWrapperProps> = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const sertoUiContext = {
    navItems: props.navItems,
    createSchema: TrustAgent.createSchema.bind(TrustAgent),
    updateSchema: TrustAgent.updateSchema.bind(TrustAgent),
    getSchemas: TrustAgent.getSchemas.bind(TrustAgent),
    // @TODO/tobek Versioned schema URLs are broken in API, so leaving this commented out until that's fixed:
    // buildSchemaUrl: (slug: string, type: string, version?: string) => `${config.API_URL}/v1/schemas/public/${slug}${version && ("/" + version)}/${type}.json`,
    buildSchemaUrl: (slug: string, type: string) => `${config.API_URL}/v1/schemas/public/${slug}/${type}.json`,
  };

  return <SertoUiProvider context={sertoUiContext}>{props.children}</SertoUiProvider>;
};
