import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { GlobalStyle } from "serto-ui";

import { config } from "./config";
import { routes } from "./constants";
import { TrustAgencyProvider } from "./context/TrustAgentProvider";
import { SertoUiProvider, fonts } from "serto-ui";
import { SelectAll } from "@rimble/icons";

import { LoginPage } from "./views/Auth/LoginPage";
import { AuthenticatedRoute } from "./views/Auth/AuthenticatedRoute";
import { OnboardingPage } from "./views/Onboarding/OnboardingPage";
import { SchemasPage } from "./views/Schemas/SchemasPage";

export const App = (): JSX.Element => {
  const sertoUiContext = {
    navItems: [{ text: "Schemas", url: routes.SCHEMAS, icon: SelectAll }],
  };
  const featureFlags = config.FEATURE_FLAGS ? config.FEATURE_FLAGS.split(",") : [];

  return (
    <Auth0Provider domain={config.AUTH0_DOMAIN} clientId={config.AUTH0_CLIENT_ID} redirectUri={window.location.origin}>
      <BrowserRouter>
        <TrustAgencyProvider featureFlags={featureFlags}>
          <React.Suspense fallback={<></>}>
            <SertoUiProvider context={sertoUiContext}>
              <GlobalStyle />
              <Switch>
                <Route path={routes.LOGIN} component={LoginPage} />
                <AuthenticatedRoute path={routes.ONBOARDING} component={OnboardingPage} />
                <AuthenticatedRoute exact path={routes.HOMEPAGE} component={SchemasPage} />
                <AuthenticatedRoute path={routes.SCHEMAS} component={SchemasPage} />
              </Switch>
            </SertoUiProvider>
          </React.Suspense>
        </TrustAgencyProvider>
      </BrowserRouter>
    </Auth0Provider>
  );
};
