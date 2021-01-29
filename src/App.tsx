import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Auth0Provider } from "@auth0/auth0-react";

import { config } from "./config";
import { routes } from "./constants";
import { TrustAgencyProvider } from "./context/TrustAgentProvider";
import { SertoUiProvider, fonts } from "serto-ui";

import { LoginPage } from "./views/Auth/LoginPage";
import { AuthenticatedRoute } from "./views/Auth/AuthenticatedRoute";
import { AcceptInvitePage } from "./views/Auth/AcceptInvitePage";
import { OnboardingPage } from "./views/Onboarding/OnboardingPage";
import { CreateOrganizationPage } from "./views/Onboarding/CreateOrganizationPage";
import { FeedsPage } from "./views/Feeds/FeedsPage";
import { CredentialsPage } from "./views/Credentials/CredentialsPage";
import { SchemasPage } from "./views/Schemas/SchemasPage";
import { IdentitiesPage } from "./views/Identities/IdentitiesPage";
import { SettingsPage } from "./views/Settings/SettingsPage";
import { DeveloperPage } from "./views/Developers/DeveloperPage";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  body {
    background-color: #F6F6FE;
    font-family: ${fonts.sansSerif};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  *, :after, :before {
    box-sizing: inherit;
  }
`;

export const App = () => {
  const featureFlags = config.FEATURE_FLAGS ? config.FEATURE_FLAGS.split(",") : [];

  return (
    <Auth0Provider domain={config.AUTH0_DOMAIN} clientId={config.AUTH0_CLIENT_ID} redirectUri={window.location.origin}>
      <BrowserRouter>
        <TrustAgencyProvider featureFlags={featureFlags}>
          <React.Suspense fallback={<></>}>
            <SertoUiProvider>
              <GlobalStyle />
              <Switch>
                <Route path={routes.LOGIN} component={LoginPage} />
                <Route path={routes.ACCEPT_INVITE} component={AcceptInvitePage} />
                <AuthenticatedRoute path={routes.ONBOARDING} component={OnboardingPage} />
                <AuthenticatedRoute path={routes.CREATE_ORGANIZATION} component={CreateOrganizationPage} />
                <AuthenticatedRoute exact path={routes.HOMEPAGE} component={CredentialsPage} />
                <AuthenticatedRoute path={routes.FEEDS} component={FeedsPage} />
                <AuthenticatedRoute path={routes.CREDENTIALS} component={CredentialsPage} />
                <AuthenticatedRoute path={routes.SCHEMAS} component={SchemasPage} />
                <AuthenticatedRoute path={routes.IDENTITIES} component={IdentitiesPage} />
                <AuthenticatedRoute path={routes.SETTINGS} component={SettingsPage} />
                <AuthenticatedRoute path={routes.DEVELOPER} component={DeveloperPage} />
              </Switch>
            </SertoUiProvider>
          </React.Suspense>
        </TrustAgencyProvider>
      </BrowserRouter>
    </Auth0Provider>
  );
};
