import React from "react";
import { routes } from "../../constants";
import { Box } from "rimble-ui";
import { baseColors, Header, HeaderBox, SchemasTable } from "serto-ui";
import { GlobalLayout } from "../../components/GlobalLayout";

export const DiscoverPage: React.FunctionComponent = () => {
  return (
    <GlobalLayout url={routes.DISCOVER}>
      <HeaderBox>
        <Header heading="Schemas" />
      </HeaderBox>

      <Box bg={baseColors.white} borderRadius={1} flexGrow="1">
        <SchemasTable discover={true} />
      </Box>
    </GlobalLayout>
  );
};
