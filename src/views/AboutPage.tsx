import React from "react";
import { Box, Text, Link } from "rimble-ui";
import { H1, H2, H4, colors } from "serto-ui";
import { routes } from "../constants";
import { GlobalLayout } from "../components/GlobalLayout";

interface FaqBoxProps {
  heading: string;
}
const FaqBox: React.FunctionComponent<FaqBoxProps> = (props) => (
  <Box p={4} mb={4} border={1}>
    <H4 color={colors.primary.base} my={0} pb={4} borderBottom={1}>
      {props.heading}
    </H4>
    <Box maxWidth="850px">{props.children}</Box>
  </Box>
);

const FaqText: React.FunctionComponent = (props) => <Text mt={3}>{props.children}</Text>;

export const AboutPage: React.FunctionComponent = () => {
  return (
    <GlobalLayout url={routes.ABOUT}>
      <Box maxWidth="880px">
        <H1>Welcome to Serto Schemas</H1>

        <Text fontSize={3} mb={5}>
          Here at Serto, we focus on building tools that enable trust. We believe decentralized identity technology
          should be enjoy by everyone. We created this tool to make it easier for you to create verifiable credentials
          (VCs) using schema templates. This shared library of VC schemas will help to prevent duplicate work, friction,
          and data silos so you can maximize the benefit of your efforts.
        </Text>
        <Text fontSize={3}>
          Below you’ll find answers to some basic questions about schemas. If you have questions that will help others,
          please let us know and we’ll add them to this list.
        </Text>
      </Box>

      <H2 mt={5}>Schema Basics</H2>

      <Text my={3}>
        <i>@TODO copy in progress</i>
      </Text>

      <FaqBox heading="What is a VC schema?">
        <FaqText>A schema is an outline of the structure of a data record.</FaqText>
        <FaqText>
          A Verifiable Credential or VC Schema is a document used to guarantee the structure, and by extension the
          semantics, of the set of claims comprising a Verifiable Credential. Think of it like a presentation template
          for credentials.
        </FaqText>
        <FaqText>
          <b>Why does it matter?</b>
        </FaqText>
        <FaqText>
          In order for multiple parties to talk to each other, they need to agree on a common language and format.
        </FaqText>
        <FaqText>A shared VC schema template allows all parties to reference data in a known way.</FaqText>
      </FaqBox>

      <FaqBox heading="How do VC Schemas work?">
        <FaqText>
          <b>Schemas are used by both humans and machines.</b>
        </FaqText>
        <FaqText>
          Humans can view the representation of a VC schema and understand what type of data is required. Machines use
          Schemas to programmatically validate VCs and create user interfaces for humans to fill out VC forms.{" "}
        </FaqText>
        <FaqText>
          Each schema on Serto Schemas can be used according to one of two schema standards: <b>JSON-LD context</b> and{" "}
          <b>JSON Schema</b>
        </FaqText>
        <FaqText>
          <b>JSON-LD</b> contexts are JSON data that define data relationships and semantics, and can leverage property
          and entities types on schema repositories such as schema.org. For more details on using JSON-LD contexts in
          VCs, see the contexts section of the VC spec: https://www.w3.org/TR/vc-data-model/#contexts
        </FaqText>
        <FaqText>
          <b>JSON Schemas</b> are also JSON data, but define data structure, requirements, descriptions and other
          metadata, thereby supporting validation of VCs to ensure conformance. For more details on using JSON Schemas
          in VCs, see the <code>credentialSchema</code> field in the VC spec:
          https://www.w3.org/TR/vc-data-model/#data-schemas
        </FaqText>
      </FaqBox>

      <FaqBox heading="How do I reference a Serto Schema to include in my VC?">
        <FaqText>
          Schemas hosted on Serto Schemas can be referenced by their URL and included in your VCs to identify them as
          instances of that schema.
        </FaqText>
      </FaqBox>

      <FaqBox heading="What technology does Serto Schemas build on?">
        <FaqText>
          Serto Schemas builds upon several widely-adopted internet standards, applying the benefits of both JSON-LD
          contexts and JSON Schema to Verified Credentials. Read more about these technologies:
        </FaqText>
        <FaqText>
          W3C Verified Credentials:{" "}
          <Link fontSize={2} href="https://www.w3.org/TR/vc-data-model/" target="_blank">
            https://www.w3.org/TR/vc-data-model/
          </Link>
        </FaqText>
        <FaqText>
          JSON-LD contexts:{" "}
          <Link fontSize={2} href="https://w3c.github.io/json-ld-syntax/#the-context" target="_blank">
            https://w3c.github.io/json-ld-syntax/#the-context
          </Link>
        </FaqText>
        <FaqText>
          JSON Schema:{" "}
          <Link fontSize={2} href="https://json-schema.org" target="_blank">
            https://json-schema.org
          </Link>
        </FaqText>
      </FaqBox>
    </GlobalLayout>
  );
};
