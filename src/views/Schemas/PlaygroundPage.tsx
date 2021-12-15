import React from "react";
import { Link as ReactLink, generatePath } from "react-router-dom";
import { Box, Text, Link } from "rimble-ui";
import { H3, colors, baseColors, SchemaPlayground } from "serto-ui";
import { routes } from "../../constants";
import { GlobalLayout } from "../../components/GlobalLayout";

export const PlaygroundPage: React.FunctionComponent = () => {
  return (
    <GlobalLayout url={routes.PLAYGROUND} fullWidth={true}>
      <Box bg={colors.darkGray} color={baseColors.white} px={5} py={4}>
        <H3 m={0} mb={2}>
          Schema Playground
        </H3>
        <Text maxWidth="1150px">
          Enter JSON Schema on the left,{" "}
          <Link
            href="https://github.com/w3c-ccg/traceability-vocab#ontology-structure"
            target="_blank"
            fontSize={2}
            color={colors.primary.light}
          >
            including embedded JSON-LD data
          </Link>{" "}
          via <code>$comment</code> or <code>$linkedData</code> properties (see examples). The compiled JSON-LD Context
          will automatically be generated in the bottom-right quadrant. You may enter a Verified Credential in the
          top-right quadrant to validate it against what you have entered.
        </Text>
        <Text mt={2}>
          See the{" "}
          <ReactLink to={generatePath(routes.EDITOR)} style={{ textDecoration: "none" }}>
            <Link fontSize={2} color={colors.primary.light}>
              VC Schema editor
            </Link>
          </ReactLink>{" "}
          for a VC-specific wizard UI and formatted views of schemas.
        </Text>
      </Box>

      <Box px={5} pt={4} pb={6}>
        <SchemaPlayground />
      </Box>
    </GlobalLayout>
  );
};
