import * as React from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { routes } from "../../constants";
import { APIKeyManagementComponent } from "./APIKeyManagementComponent";
import { DocumentationComponent } from "./DocumentationComponent";
import { GlobalLayout, Header, HeaderBox, Tabs } from "serto-ui";
import { LogOut } from "../Auth/LogOut";

export const DeveloperPage: React.FunctionComponent = () => {
  const { tabName } = useParams<{ tabName: string }>();
  const history = useHistory();
  if (tabName && tabName !== "api-keys" && tabName !== "docs") {
    history.push(generatePath(routes.DEVELOPER));
  }

  return (
    <GlobalLayout url={routes.DEVELOPER} sidebarBottomContents={<LogOut />}>
      <HeaderBox>
        <Header heading="Developers" />
      </HeaderBox>
      <Tabs
        activeTabName={tabName || "api-keys"}
        tabs={[
          {
            tabName: "api-keys",
            title: "API Keys",
            content: <APIKeyManagementComponent />,
          },
          {
            tabName: "docs",
            title: "Documentation",
            content: <DocumentationComponent />,
          },
        ]}
        onTabClicked={(tabName) => {
          history.push(generatePath(routes.DEVELOPER, { tabName }));
        }}
      />
    </GlobalLayout>
  );
};
