import React from "react";
import { routes } from "../constants";
import { Box, Text } from "rimble-ui";
import { baseColors, GlobalLayout, Header, HeaderBox } from "serto-ui";

export const AboutPage: React.FunctionComponent = () => {
  return (
    <GlobalLayout url={routes.ABOUT} sidebarBottomContents={<>@TODO/tobek log in/out</>}>
      <HeaderBox>
        <Header heading="About Serto Schemas" />
      </HeaderBox>

      <Box p={4} bg={baseColors.white} borderRadius={1} flexGrow="1">
        <Text>@TODO</Text>
        <Text>A schema defines the structure and format of a data record.</Text>
        <Text>
          It describeshow the metadata is set up to ensure that both producers and consumers of the data use the correct
          structure.
        </Text>
        <Text>Schemas help producers create data that conforms to a predefined structure.</Text>
        <Text>This definition then helps consumers parse that data and interpret it correctly.</Text>
      </Box>
    </GlobalLayout>
  );
};
