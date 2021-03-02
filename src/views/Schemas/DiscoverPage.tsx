import React from "react";
import { routes } from "../../constants";
import { Box, Button } from "rimble-ui";
import { baseColors, GlobalLayout, Header, HeaderBox, SchemasTable } from "serto-ui";

export const DiscoverPage: React.FunctionComponent = () => {
  return (
    <GlobalLayout url={routes.DISCOVER} sidebarBottomContents={<Button.Outline>Log In</Button.Outline>}>
      {/*Log in vs log out should depend on auth and be lifted higher up*/}
      <HeaderBox>
        <Header heading="Schemas" />
      </HeaderBox>

      <Box bg={baseColors.white} borderRadius={1} flexGrow="1">
        <SchemasTable discover={true} />,
      </Box>
    </GlobalLayout>
  );
};
