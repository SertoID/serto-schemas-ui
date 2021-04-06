import * as React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { SertoUiContext, SertoUiContextInterface, baseColors, SchemaCard, H2, H3, H4, colors } from "serto-ui";
import { Flex, Box, Button, Text, Loader, Flash } from "rimble-ui";
import { FindInPage, Star } from "@rimble/icons";
import { routes } from "../constants";
import { useAuth } from "../services/useAuth";
import { GlobalLayout } from "../components/GlobalLayout";

export const HomePage: React.FunctionComponent = () => {
  const { isAuthenticated } = useAuth();
  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;
  const { data, error, isValidating } = useSWR(["/v1/schemas", true], () => schemasService.getSchemas(), {
    revalidateOnFocus: false,
  });
  const schemas = React.useMemo(() => data?.sort((schema1, schema2) => (schema1.updated < schema2.updated ? 1 : -1)), [
    data,
  ]);

  return (
    <GlobalLayout url={routes.HOMEPAGE}>
      <Box bg={baseColors.white} borderRadius={1} py={4}>
        <Box>
          <H2>A shared vocabulary for Verifiable Credentials</H2>
          <Text>
            Serto Schemas is a shared repository of schemas for verifiable credentials (VCs). Discover, create, use, and
            evolve existing schemas. Get maximum benefit for your efforts while preventing duplicate work, friction, and
            data silos.
          </Text>
          {!isAuthenticated && (
            <Button as={Link} to={routes.LOGIN} mt={4}>
              Sign up for free
            </Button>
          )}
        </Box>

        <Flex my={6}>
          <Box p={4} mr={2} backgroundColor={colors.primary.border} borderRadius="10px" textAlign="center">
            <FindInPage size="64px" />
            <H3>Discover &amp; Learn</H3>
            <Text>
              Just starting out? Browsing and playing with VC schemas is a great way to understand how they work and how
              to use them for Verifiable Credentials.
            </Text>
            <Button.Outline mt={3} as={Link} to={routes.SCHEMAS} size="small">
              Browse Schemas
            </Button.Outline>
          </Box>
          <Box p={4} ml={2} backgroundColor={colors.primary.border} borderRadius="10px" textAlign="center">
            <Star size="64px" />
            <H3>Build &amp; Test</H3>
            <Text>
              Get work done quicker by building and testing new schemas using the VC Schema Editor. Switch between the
              builder UI or code as you go.
            </Text>
            <Button.Outline mt={3} as={Link} to={routes.PLAYGROUND} size="small">
              Try the VC Schema Editor
            </Button.Outline>
          </Box>
        </Flex>

        <Box my={6}>
          <Flex justifyContent="space-between" flexWrap="wrap">
            <Box width="32%" pb={6}>
              <H3 mt={0}>Find Inspiration from Established Schemas</H3>
              <Text>Browse and use schemas from world-class organizations and developers in the community.</Text>
            </Box>
            {isValidating && !schemas?.length ? (
              [1, 2, 3, 4, 5].map((i) => (
                <Box key={i} py={6} width="32%">
                  <Loader size="32px" m="auto" />
                </Box>
              ))
            ) : error ? (
              <Flash variant="danger" width="33%">
                Failed to load schemas: {error.message}
              </Flash>
            ) : (
              // @TODO/tobek Concatting schemas to get more for now
              schemas
                ?.concat(schemas)
                .concat(schemas)
                .slice(0, 5)
                .map((schema, i) => (
                  <SchemaCard schema={schema} key={i} style={{ width: "32%", marginBottom: "16px" }} />
                ))
            )}
          </Flex>
          <Box textAlign="center" mt={5}>
            <Button.Outline as={Link} to={routes.SCHEMAS}>
              See More
            </Button.Outline>
          </Box>
        </Box>

        <Box my={6}>
          <H3>An in-browser sandbox for building, testing and validating verifiable credential schemas</H3>
          <H4>Do it live. In real time!</H4>
          <ul>
            <li>View example schemas and verifiable credentials (VCs)</li>
            <li>Validate syntax for schemas and VCs as you edit</li>
            <li>Validate VCs against a schema</li>
            <li>Preview of JSON-LD context and JSON Schema as you work</li>
          </ul>
          <Button as={Link} to={routes.PLAYGROUND}>
            Explore the VC Schema Editor
          </Button>
        </Box>
      </Box>
    </GlobalLayout>
  );
};
