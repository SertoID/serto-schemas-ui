import * as React from "react";
import { Link, generatePath, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Flex, Box, Button, Text, Image } from "rimble-ui";
import { baseColors, SchemaCards, H2, H3, H4, colors, SchemaDataResponse } from "serto-ui";
import { FindInPage, Star } from "@rimble/icons";
import { routes } from "../constants";
import { useAuth } from "../services/useAuth";
import { GlobalLayout, CONTENT_WIDTH } from "../components/GlobalLayout";

// For some reason `color` attribute on `Button` doesn't work (at least not when using `as={Link}`), and `styled(Button)` doesn't let us change it either, so:
const TextButtonWrap = styled.span`
  a {
    color: ${baseColors.white};
  }
  a:hover {
    text-decoration: none;
    color: ${colors.primary.light};
  }
`;
const OutlineButtonWrap = styled.span`
  a {
    background-color: ${baseColors.white};
    box-shadow: 0px 2px 4px rgba(50, 50, 63, 0.1);
  }
`;

const DoItLiveListItem = styled.li`
  margin-bottom: 16px;
  margin-left: -10px;
  line-height: 1;
  font-size: 36px;
  span {
    font-size: 20px;
    position: relative;
    top: -4px;
  }
`;

export const HomePage: React.FunctionComponent = () => {
  const { isAuthenticated } = useAuth();

  const history = useHistory();
  function onSchemaClick(schema: SchemaDataResponse) {
    history.push(generatePath(routes.SCHEMA, { slug: schema.slug }));
  }

  return (
    <GlobalLayout url={routes.HOMEPAGE} fullWidth={true}>
      <Box bg={colors.darkGray} color={baseColors.white} pt={6} pb={8}>
        <Flex width={CONTENT_WIDTH} mx="auto" alignItems="center">
          <Box width="60%">
            <H2 fontSize={6} lineHeight="1.4" mb={4}>
              A shared vocabulary for Verifiable Credentials
            </H2>
            <Text fontSize={3} maxWidth={9}>
              Serto Schemas is a shared repository of schemas for verifiable credentials (VCs). Discover, create, use,
              and evolve existing schemas. Get maximum benefit for your efforts while preventing duplicate work,
              friction, and data silos.
            </Text>
            {isAuthenticated ? (
              <Button as={Link} to={routes.ABOUT} mt={5}>
                Learn More
              </Button>
            ) : (
              <>
                <Button as={Link} to={routes.LOGIN} mt={5} mr={5}>
                  Sign up with GitHub
                </Button>
                <TextButtonWrap>
                  <Button.Text as={Link} to={routes.ABOUT} mt={5}>
                    Learn More
                  </Button.Text>
                </TextButtonWrap>
              </>
            )}
          </Box>
          <Box width="40%" textAlign="center">
            <Image mt={6} src="http://www.fillmurray.com/g/310/330" />
          </Box>
        </Flex>
      </Box>

      <Flex width={CONTENT_WIDTH} mx="auto" mt="-100px" mb={6}>
        <Box
          p={4}
          pb={5}
          mr={3}
          backgroundColor={colors.primary.border}
          borderRadius="10px"
          boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3);"
          textAlign="center"
        >
          <FindInPage size="64px" />
          <H3>Discover &amp; Learn</H3>
          <Text>
            Just starting out? Browsing and playing with VC schemas is a great way to understand how they work and how
            to use them for Verifiable Credentials.
          </Text>
          <OutlineButtonWrap>
            <Button.Outline mt={4} mb={3} as={Link} to={generatePath(routes.SCHEMAS)} size="small">
              Browse Schemas
            </Button.Outline>
          </OutlineButtonWrap>
        </Box>
        <Box
          p={4}
          pb={5}
          ml={3}
          backgroundColor={colors.primary.border}
          borderRadius="10px"
          boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3);"
          textAlign="center"
        >
          <Star size="64px" />
          <H3>Build &amp; Test</H3>
          <Text>
            Get work done quicker by building and testing new schemas using the VC Schema Editor. Switch between the
            builder UI or code as you go.
          </Text>
          <OutlineButtonWrap>
            <Button.Outline mt={4} mb={3} as={Link} to={routes.PLAYGROUND} size="small">
              Try the VC Schema Editor
            </Button.Outline>
          </OutlineButtonWrap>
        </Box>
      </Flex>

      <Box width={CONTENT_WIDTH} mx="auto" mt={7} mb={6}>
        <SchemaCards
          onSchemaClick={onSchemaClick}
          maxLength={5}
          firstCard={
            <Box pb={6}>
              <H3 fontSize={5} lineHeight="1.4" mt={0}>
                Find Inspiration from Established Schemas
              </H3>
              <Text fontSize={3}>
                Browse and use schemas from world-class organizations and developers in the community.
              </Text>
            </Box>
          }
        />
        <Box textAlign="center" mt={5}>
          <OutlineButtonWrap>
            <Button.Outline as={Link} to={generatePath(routes.SCHEMAS)} mb={1}>
              See More
            </Button.Outline>
          </OutlineButtonWrap>
        </Box>
      </Box>

      <Box bg={colors.darkGray} color={baseColors.white} pt={5} pb={6}>
        <Box width={CONTENT_WIDTH} mx="auto" my={5}>
          <H3 fontSize={5} lineHeight="1.4" textAlign="center">
            An in-browser sandbox for building, testing, and validating verifiable credential schemas
          </H3>
          <Flex mt="48px">
            <Box width="33%" pr={3}>
              <H4 fontSize={4} mb={4}>
                Do it live. In real time!
              </H4>
              <ul>
                <DoItLiveListItem>
                  <span>View example schemas and verifiable credentials (VCs)</span>
                </DoItLiveListItem>
                <DoItLiveListItem>
                  <span>Validate syntax for schemas and VCs as you edit</span>
                </DoItLiveListItem>
                <DoItLiveListItem>
                  <span>Validate VCs against a schema</span>
                </DoItLiveListItem>
                <DoItLiveListItem>
                  <span>Preview JSON-LD context and JSON Schema output as you work</span>
                </DoItLiveListItem>
              </ul>
              <Button mt={5} as={Link} to={routes.PLAYGROUND}>
                Explore the VC Schema Editor
              </Button>
            </Box>
            <Box width="66%" pl={5}>
              <Image src="http://www.fillmurray.com/g/770/500" />
            </Box>
          </Flex>
        </Box>
      </Box>
    </GlobalLayout>
  );
};
