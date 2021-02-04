import * as React from "react";
import { links } from "../../constants";
import { Box, Button, Flex, Text } from "rimble-ui";
import { baseColors, H2 } from "serto-ui";

export const OnboardingPage: React.FunctionComponent = () => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Box bg={baseColors.white} borderRadius={1} m={3} mb={0} p={3}>
        <Button.Text as="a" href={links.DOCUMENTATION}>
          Help Docs?
        </Button.Text>
      </Box>
      <Box bg={baseColors.white} borderRadius={1} m={3} p={6} flexGrow="1">
        <H2 color={baseColors.blurple} mt={0} textAlign="center">
          Welcome!
        </H2>
        <Box mx="auto" width="350px">
          <Box border={1} mb={4} p={5}>
            <Text fontSize={2} fontWeight={3}>
              @TODO/tobek What goes here?
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
