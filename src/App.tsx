import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Home, Info, FindInPage, Code } from "@rimble/icons";
import { GlobalStyle } from "serto-ui";

import { config } from "./config";
import { routes } from "./constants";
import { TrustAgencyProvider } from "./context/TrustAgentProvider";
import { SertoUiWrapper } from "./context/SertoUiWrapper";

import { HomePage } from "./views/HomePage";
import { LoginPage } from "./views/Auth/LoginPage";
import { AuthenticatedRoute } from "./views/Auth/AuthenticatedRoute";
import { OnboardingPage } from "./views/Onboarding/OnboardingPage";
import { SchemasPage } from "./views/Schemas/SchemasPage";
import { DiscoverPage } from "./views/Schemas/DiscoverPage";
import { AboutPage } from "./views/AboutPage";
import { PlaygroundPage } from "./views/Schemas/PlaygroundPage";

export const App = (): JSX.Element => {
  const navItems = [
    { text: "Home", url: routes.HOMEPAGE, icon: Home },
    { text: "About", url: routes.ABOUT, icon: Info },
    { text: "Discover", url: routes.DISCOVER, icon: FindInPage },
    { text: "Playground", url: routes.PLAYGROUND, icon: Code },
  ];
  const featureFlags = config.FEATURE_FLAGS ? config.FEATURE_FLAGS.split(",") : [];

  return (
    <Auth0Provider domain={config.AUTH0_DOMAIN} clientId={config.AUTH0_CLIENT_ID} redirectUri={window.location.origin}>
      <BrowserRouter>
        <TrustAgencyProvider featureFlags={featureFlags}>
          <React.Suspense fallback={<></>}>
            <SertoUiWrapper navItems={navItems}>
              <GlobalStyle />
              <Switch>
                <Route exact path={routes.HOMEPAGE} component={HomePage} />
                <Route path={routes.LOGIN} component={LoginPage} />
                <Route exact path={routes.DISCOVER} component={DiscoverPage} />
                <AuthenticatedRoute path={routes.ONBOARDING} component={OnboardingPage} />
                <AuthenticatedRoute exact path={routes.HOMEPAGE} component={SchemasPage} />
                <AuthenticatedRoute path={routes.ABOUT} component={AboutPage} />
                <AuthenticatedRoute path={routes.PLAYGROUND} component={PlaygroundPage} />
                <AuthenticatedRoute path={routes.SCHEMAS} component={SchemasPage} />
              </Switch>
            </SertoUiWrapper>
          </React.Suspense>
        </TrustAgencyProvider>
      </BrowserRouter>
    </Auth0Provider>
  );
};
