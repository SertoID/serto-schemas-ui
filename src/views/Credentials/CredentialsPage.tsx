import * as React from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { featureFlags, routes } from "../../constants";
import { FeatureFlagContext } from "../../context/TrustAgentProvider";
import { FeatureFlagService } from "../../services/FeatureFlagService";
import { IssuedCredentials } from "./IssuedCredentials";
import { ReceivedCredentials } from "./ReceivedCredentials";
import { Header, HeaderBox, Tabs } from "serto-ui";
import { GlobalLayout } from "../../components/layouts";
import { IssueCredentialButton } from "../../components/elements/Credential/IssueCredentialButton";

export const CredentialsPage: React.FunctionComponent = () => {
  const features = React.useContext<FeatureFlagService>(FeatureFlagContext);
  const { tabName } = useParams<{ tabName: string }>();
  const history = useHistory();
  if (tabName && tabName !== "issued" && tabName !== "received") {
    history.push(generatePath(routes.CREDENTIALS));
  }

  return (
    <GlobalLayout url={routes.CREDENTIALS}>
      <HeaderBox>
        <Header heading="Credentials">
          <IssueCredentialButton />
        </Header>
      </HeaderBox>
      <Tabs
        activeTabName={tabName || "issued"}
        tabs={[
          {
            tabName: "issued",
            title: "Issued Credentials",
            content: <IssuedCredentials />,
          },
        ].concat(
          features.featureEnabled(featureFlags.VC_WIP)
            ? {
                tabName: "received",
                title: "Received Credentials",
                content: <ReceivedCredentials />,
              }
            : [],
        )}
        onTabClicked={(tabName) => {
          history.push(generatePath(routes.CREDENTIALS, { tabName }));
        }}
      />
    </GlobalLayout>
  );
};
