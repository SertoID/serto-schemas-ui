import React, { useContext } from "react";
import useSWR from "swr";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { featureFlags, routes } from "../../constants";
import { FeatureFlagContext, TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { FeatureFlagService } from "../../services/FeatureFlagService";
import { IssuedCredentials } from "./IssuedCredentials";
import { ReceivedCredentials } from "./ReceivedCredentials";
import { Header, HeaderBox, Tabs, IssueCredentialButton } from "serto-ui";
import { GlobalLayout } from "../../components/layouts";
import { Identifier } from "../../types";

export const CredentialsPage: React.FunctionComponent = () => {
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);
  const features = React.useContext<FeatureFlagService>(FeatureFlagContext);
  const { tabName } = useParams<{ tabName: string }>();
  const history = useHistory();
  if (tabName && tabName !== "issued" && tabName !== "received") {
    history.push(generatePath(routes.CREDENTIALS));
  }

  const { data: identifiers } = useSWR("/v1/tenant/agent/identityManagerGetIdentities", () =>
    TrustAgent.getTenantIdentifiers(),
  );

  const issuerIdentifiers: Identifier[] = [];
  if (identifiers) {
    identifiers.forEach((id: any) => {
      issuerIdentifiers.push({
        did: id.did,
        provider: id.provider,
      });
    });
  }

  return (
    <GlobalLayout url={routes.CREDENTIALS}>
      <HeaderBox>
        <Header heading="Credentials">
          {identifiers && <IssueCredentialButton issuerIdentifiers={issuerIdentifiers} />}
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
