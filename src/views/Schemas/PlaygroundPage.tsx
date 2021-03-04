import React from "react";
import { routes } from "../../constants";
import { Box } from "rimble-ui";
import { baseColors, Header, HeaderBox, SchemaPlayground } from "serto-ui";
import { GlobalLayout } from "../../components/GlobalLayout";

export const PlaygroundPage: React.FunctionComponent = () => {
  return (
    <GlobalLayout url={routes.PLAYGROUND}>
      <HeaderBox>
        <Header heading="Schema Playground" />
      </HeaderBox>

      <Box p={4} bg={baseColors.white} borderRadius={1} flexGrow="1">
        <SchemaPlayground />
      </Box>
    </GlobalLayout>
  );
};
