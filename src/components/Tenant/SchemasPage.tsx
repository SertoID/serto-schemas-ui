import * as React from "react";
import { Box, Button, Flash, Flex, Loader, Modal, Table, Text } from "rimble-ui";
import useSWR, { mutate } from "swr";
import { routes } from "../../constants";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { baseColors, colors, GlobalLayout, Header, HeaderBox, TBody, TH, TR } from "../elements";
import { CreateSchema } from "../elements/components/Schemas/CreateSchema";
import { LdContextPlus } from "../elements/components/Schemas/VcSchema";

export const SchemasPage: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [fakeData, setFakeData] = React.useState<LdContextPlus[]>([]); // @TODO/tobek Temporary until API integration.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error: getSchemasError, isValidating } = useSWR("/v1/schemas", () => TrustAgent.getSchemas());

  function viewSchema(schema: LdContextPlus) {
    alert("Coming soon!");
  }

  return (
    <GlobalLayout url={routes.SCHEMAS}>
      {fakeData?.length > 0 ? (
        <>
          <HeaderBox>
            <Header heading="Credential Schemas">
              <Button.Outline onClick={() => setIsCreateModalOpen(true)} size="small">
                Create Schema
              </Button.Outline>
            </Header>
          </HeaderBox>

          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <thead>
                <TR>
                  <TH></TH>
                  <TH>Name</TH>
                  <TH>Slug</TH>
                  <TH>Version</TH>
                  <TH>Created</TH>
                  <TH></TH>
                </TR>
              </thead>
              <TBody>
                {fakeData.map((schema: LdContextPlus, i: number) => {
                  const schemaData = schema["@context"];
                  return (
                    <TR key={i}>
                      <td style={{ maxWidth: 32 }}>{schemaData["@metadata"]?.icon}</td>
                      <td>{schemaData["@title"]}</td>
                      <td>{schemaData["@metadata"]?.slug}</td>
                      <td>{schemaData["@metadata"]?.version}</td>
                      <td>
                        {schemaData["@metadata"]?.created && (
                          <time title={schemaData["@metadata"]?.created} dateTime={schemaData["@metadata"]?.created}>
                            {new Date(schemaData["@metadata"]?.created).toDateString()}
                          </time>
                        )}
                      </td>
                      <td>
                        <Button.Outline size="small" onClick={() => viewSchema(schema)}>
                          View
                        </Button.Outline>
                      </td>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </Box>
        </>
      ) : isValidating ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flex minHeight={8} alignItems="center" justifyContent="center">
            <Loader color={colors.primary.base} size={4} />
          </Flex>
        </Box>
      ) : getSchemasError ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Error loading schemas: {JSON.stringify(getSchemasError)}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flex alignItems="center" justifyContent="center" minHeight={8}>
            <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
              <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
                <b style={{ display: "block", fontWeight: 600 }}>You do not have any credential schemas.</b>
                Create a credential schema to coordinate around verified data with your customers or partners.
              </Text.span>
              <Flex alignItems="center" justifyContent="center">
                <Button onClick={() => setIsCreateModalOpen(true)} size="small" mt={5} mx="auto">
                  Create Schema
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}

      <Modal isOpen={isCreateModalOpen}>
        <CreateSchema
          onClose={() => setIsCreateModalOpen(false)}
          onSchemaCreated={(schema) => {
            mutate("/v1/schemas");
            setFakeData([...fakeData, schema]);
          }}
        ></CreateSchema>
      </Modal>
    </GlobalLayout>
  );
};