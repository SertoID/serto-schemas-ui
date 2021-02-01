import * as React from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { routes } from "../../constants";
import { MemberManagement } from "./MemberManagement";
import { DIDManagement } from "./DIDManagement";
import { Header, HeaderBox, Tabs } from "serto-ui";
import { GlobalLayout } from "../../components/layouts";

export const SettingsPage: React.FunctionComponent = () => {
  const { tabName } = useParams<{ tabName: string }>();
  const history = useHistory();
  if (tabName && tabName !== "members" && tabName !== "identifiers" && tabName !== "account-plan") {
    history.push(generatePath(routes.SETTINGS));
  }

  return (
    <GlobalLayout url={routes.SETTINGS}>
      <HeaderBox>
        <Header heading="Settings" />
      </HeaderBox>
      <Tabs
        activeTabName={tabName || "members"}
        tabs={[
          {
            tabName: "members",
            title: "Members",
            content: <MemberManagement />,
          },
          {
            tabName: "identifiers",
            title: "Identifiers",
            content: <DIDManagement />,
          },
        ]}
        onTabClicked={(tabName) => {
          history.push(generatePath(routes.SETTINGS, { tabName }));
        }}
      />
    </GlobalLayout>
  );
};
