import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SelectAll } from "@rimble/icons";
import { Auth0Provider } from "@auth0/auth0-react";
import { GlobalStyle } from "serto-ui";

import { config } from "./config";
import { routes } from "./constants";
import { TrustAgencyProvider } from "./context/TrustAgentProvider";
import { SertoUiWrapper } from "./context/SertoUiWrapper";

import { LoginPage } from "./views/Auth/LoginPage";
import { AuthenticatedRoute } from "./views/Auth/AuthenticatedRoute";
import { OnboardingPage } from "./views/Onboarding/OnboardingPage";
import { SchemasPage } from "./views/Schemas/SchemasPage";

export const App = (): JSX.Element => {
  const navItems = [{ text: "Schemas", url: routes.SCHEMAS, icon: SelectAll }];
  const featureFlags = config.FEATURE_FLAGS ? config.FEATURE_FLAGS.split(",") : [];

  return (
    <Auth0Provider domain={config.AUTH0_DOMAIN} clientId={config.AUTH0_CLIENT_ID} redirectUri={window.location.origin}>
      <BrowserRouter>
        <TrustAgencyProvider featureFlags={featureFlags}>
          <React.Suspense fallback={<></>}>
            <SertoUiWrapper navItems={navItems}>
              <GlobalStyle />
              <Switch>
                <Route path={routes.LOGIN} component={LoginPage} />
                <AuthenticatedRoute path={routes.ONBOARDING} component={OnboardingPage} />
                <AuthenticatedRoute exact path={routes.HOMEPAGE} component={SchemasPage} />
                <AuthenticatedRoute path={routes.SCHEMAS} component={SchemasPage} />
              </Switch>
            </SertoUiWrapper>
          </React.Suspense>
        </TrustAgencyProvider>
      </BrowserRouter>
    </Auth0Provider>
  );
};
