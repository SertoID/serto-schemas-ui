import React, { useState } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { routes } from "../../constants";
import { Box, Button, Flex, Text } from "rimble-ui";
import { H1, baseColors, ModalWithX, Tabs, CreateSchema, SchemasTable } from "serto-ui";
import { CONTENT_WIDTH, GlobalLayout } from "../../components/GlobalLayout";

export const SchemasPage: React.FunctionComponent = () => {
  const { tabName } = useParams<{ tabName: string }>();
  const history = useHistory();
  if (tabName && tabName !== "created" && tabName !== "discover") {
    history.push(generatePath(routes.SCHEMAS));
  }

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateModalFinalStep, setIsCreateModalFinalStep] = useState(false);

  const noSchemas = (
    <Flex alignItems="center" justifyContent="center" minHeight={8}>
      <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
        <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
          <b style={{ display: "block", fontWeight: 600 }}>
            {tabName === "discover"
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
      <Button.Outline onClick={() => setIsCreateModalOpen(true)} size="small" minWidth="150px">
        Create Schema
      </Button.Outline>

      <Tabs
        activeTabName={tabName || "created"}
        tabs={[
          {
            tabName: "created",
            title: "Created",
            content: <SchemasTable discover={false} noSchemasElement={noSchemas} />,
          },
          {
            tabName: "discover",
            title: "Discover",
            content: <SchemasTable discover={true} noSchemasElement={noSchemas} />,
          },
        ]}
        onTabClicked={(tabName) => {
          history.push(generatePath(routes.SCHEMAS, { tabName }));
        }}
      />

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
