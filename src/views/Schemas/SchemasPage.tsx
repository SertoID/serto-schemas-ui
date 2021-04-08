import React, { useState } from "react";
import { Link, generatePath, useHistory, useParams } from "react-router-dom";
import { Box, Button, Flex, Text } from "rimble-ui";
import { H1, baseColors, ModalWithX, Tabs, CreateSchema, SchemaCards } from "serto-ui";
import { routes } from "../../constants";
import { CONTENT_WIDTH, GlobalLayout } from "../../components/GlobalLayout";

export const SchemasPage: React.FunctionComponent = () => {
  const { tabName } = useParams<{ tabName: string }>();
  const history = useHistory();
  if (tabName && tabName !== "created" && tabName !== "all") {
    history.push(generatePath(routes.SCHEMAS));
  }

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateModalFinalStep, setIsCreateModalFinalStep] = useState(false);

  const noSchemas = (
    <Flex alignItems="center" justifyContent="center" minHeight={8}>
      <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
        <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
          <b style={{ display: "block", fontWeight: 600 }}>
            {tabName !== "created"
              ? "There are no publicly discoverable credential schemas yet."
              : "You do not have any credential schemas."}
          </b>
          Create a credential schema to coordinate around verified data with your customers and partners.
        </Text.span>
        <Flex alignItems="center" justifyContent="center">
          <Button onClick={() => setIsCreateModalOpen(true)} size="small" mt={5} mx="auto">
            Create Schema
          </Button>
        </Flex>
      </Box>
    </Flex>
  );

  return (
    <GlobalLayout
      url={routes.SCHEMAS}
      headerContent={
        <Box pt={6} pb="82px" maxWidth={CONTENT_WIDTH} m="auto">
          <H1>Explore Schemas</H1>
          <Text maxWidth={9}>
            Browse and use VC schemas from world-class organizations and developers in the community. Or create a new VC
            schema to meet your needs.
          </Text>
        </Box>
      }
    >
      <Tabs
        activeTabName={tabName || "all"}
        subHeader={
          <Box textAlign="right" py={3}>
            {/*@TODO/tobek deep link to FAQ*/}
            <Button.Text size="verySmall" as={Link} to={routes.ABOUT}>
              What is a schema?
            </Button.Text>
            <Button onClick={() => setIsCreateModalOpen(true)} size="small" minWidth="150px">
              Create a VC Schema
            </Button>
          </Box>
        }
        tabs={[
          {
            tabName: "all",
            title: "All Schemas",
            content: <SchemaCards noSchemasElement={noSchemas} />,
          },
          {
            tabName: "created",
            title: "Your Schemas",
            content: <SchemaCards filter="CREATED" noSchemasElement={noSchemas} />,
          },
        ]}
        onTabClicked={(tabName) => {
          history.push(generatePath(routes.SCHEMAS, { tabName }));
        }}
      />
      {/*@TODO/tobek Add "Saved Schemas" when we have support*/}

      <ModalWithX
        isOpen={isCreateModalOpen}
        hideX={isCreateModalFinalStep}
        close={() => setIsCreateModalOpen(false)}
        minWidth={9}
        maxWidth={11}
      >
        <CreateSchema
          onFinalStep={() => setIsCreateModalFinalStep(true)}
          onComplete={() => {
            setIsCreateModalOpen(false);
            setIsCreateModalFinalStep(false);
          }}
        ></CreateSchema>
      </ModalWithX>
    </GlobalLayout>
  );
};
