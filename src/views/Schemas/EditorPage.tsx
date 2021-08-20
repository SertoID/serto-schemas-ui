import React from "react";
import { Link, useHistory, useParams, generatePath } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";
import { Info } from "@rimble/icons";
import { Loader, Flash, Button, Box, Text, Flex } from "rimble-ui";
import {
  SertoUiContext,
  SertoUiContextInterface,
  H3,
  colors,
  baseColors,
  CreateSchema,
  schemaResponseToWorkingSchema,
} from "serto-ui";
import { routes } from "../../constants";
import { GlobalLayout } from "../../components/GlobalLayout";

const StyledCreateSchema = styled(CreateSchema)`
  position: relative;

  // 182px = site header + page header + some padding
  max-height: calc(100vh - 192px);

  .right-pane {
    pre,
    .schema-formatted-preview {
      // 300px = site header + page header + SchemaDetail view selector header + some padding
      max-height: calc(100vh - 300px);
      overflow-y: auto;
    }
  }
`;

export const EditorPage: React.FunctionComponent = () => {
  const { slug } = useParams<{ slug: string }>();
  const editMode = !!slug;
  const history = useHistory();

  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;
  const { data: schema, error, isValidating } = useSWR(
    `/v1/schemas/public/${slug}`,
    () => (slug ? schemasService.getSchema(slug) : undefined),
    {
      revalidateOnFocus: false,
    },
  );

  const initialSchemaState = React.useMemo(() => {
    if (schema) {
      return schemaResponseToWorkingSchema(schema);
    }
  }, [schema]);

  const userOwnsSchema =
    schema && !!schemasService.userData?.sub && schemasService.userData.sub === schema.creator?.identifier;

  return (
    <GlobalLayout url={routes.EDITOR} fullWidth={true}>
      {((editMode && !userOwnsSchema) || !schemasService.isAuthenticated) && !isValidating && (
        <Flash variant="danger" border={0}>
          <Flex justifyContent="center">
            <Info color={colors.danger.dark} />
            <Text ml={2}>
              {!schemasService.isAuthenticated ? (
                <>
                  You are not currently logged in. You may explore the schema preview and editor, but must{" "}
                  <Link to={routes.LOGIN}>log in</Link> order to {editMode ? "make any changes" : "create a schema"}.
                </>
              ) : (
                "You are not the creator of this schema. Any changes you make will be saved as a new fork of this schema."
              )}
            </Text>
          </Flex>
        </Flash>
      )}

      <Flex
        bg={colors.darkGray}
        color={baseColors.white}
        px={5}
        py={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <H3 m={0} mb={2}>
            VC Schema Editor
          </H3>
          <Text>Edit, build, test, and validate verifiable credentials (VC) schemas</Text>
        </Box>
        {editMode && (
          <Button.Text ml={4} mainColor={baseColors.white} onClick={() => history.goBack()}>
            Cancel
          </Button.Text>
        )}
      </Flex>

      {!slug || schema ? (
        <StyledCreateSchema
          onSchemaSaved={(schema) => {
            history.push(generatePath(routes.SCHEMA, { slug: schema.slug }));
          }}
          initialSchemaState={initialSchemaState}
          isUpdate={!!initialSchemaState}
          userOwnsSchema={userOwnsSchema}
        />
      ) : error ? (
        <Box px={6} py={6} minHeight={9}>
          <Flash variant="danger">
            <p>Error loading schema "{slug}":</p>
            <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
          </Flash>
        </Box>
      ) : (
        <Box px={6} py={8} minHeight={9} textAlign="center">
          <Loader size="32px" m="auto" />
        </Box>
      )}

      <Box bg={colors.darkGray} height={6} />
    </GlobalLayout>
  );
};
