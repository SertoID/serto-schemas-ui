import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Text, Link } from "rimble-ui";
import { H3, colors, baseColors, SchemaPlayground } from "serto-ui";
import { routes } from "../../constants";
import { GlobalLayout } from "../../components/GlobalLayout";

export const PlaygroundPage: React.FunctionComponent = () => {
  return (
    <GlobalLayout url={routes.PLAYGROUND} fullWidth={true}>
      <Box bg={colors.darkGray} color={baseColors.white} p={5}>
        <H3 m={0} mb={3}>
          JSON-LD Context Plus Schema Playground
        </H3>
        <Text maxWidth="1150px">
          Enter{" "}
          <Link
            href="https://docs.google.com/document/d/1l41XsI1nTCxx3T6IpAV59UkBrMfRzC89TZRPYiDjOC4/edit?usp=sharing"
            target="_blank"
            fontSize={2}
            color={colors.primary.light}
          >
            JSON-LD Context Plus schema
          </Link>{" "}
          in the top-left quadrant, and the compiled JSON-LD Context and JSON Schema will automatically be generated in
          the bottom quadrants. You may enter a Verified Credential in the top-right quadrant to validate it against
          what you have entered.
        </Text>
        <Text mt={2}>
          See the{" "}
          <ReactLink to={routes.EDITOR} style={{ textDecoration: "none" }}>
            <Link fontSize={2} color={colors.primary.light}>
              VC Schema editor
            </Link>
          </ReactLink>{" "}
          for a VC-specific wizard UI and formatted views of schemas using JSON-LD Context Plus.
        </Text>
      </Box>

      <Box px={5} pt={4} pb={6}>
        <SchemaPlayground />
      </Box>
    </GlobalLayout>
  );
};
