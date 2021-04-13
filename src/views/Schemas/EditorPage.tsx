import React from "react";
import { useHistory, generatePath } from "react-router-dom";
import styled from "styled-components";
import { Button, Box, Text, Flex } from "rimble-ui";
import { H3, colors, baseColors, CreateSchema } from "serto-ui";
import { routes } from "../../constants";
import { GlobalLayout } from "../../components/GlobalLayout";

const StyledCreateSchema = styled(CreateSchema)`
  position: relative;

  // 182px = site header + page header + some padding
  max-height: calc(100vh - 192px);

  pre {
    // 300px = site header + page header + SchemaDetail view selector header + some padding
    max-height: calc(100vh - 300px);
  }
`;

export interface EditorPageProps {
  editMode?: boolean;
}

export const EditorPage: React.FunctionComponent<EditorPageProps> = (props) => {
  const { editMode } = props;

  const history = useHistory();

  return (
    <GlobalLayout url={routes.EDITOR} fullWidth={true}>
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
          <Box>
            <Button width={7} onClick={() => console.log("@TODO/tobek")}>
              Save
            </Button>
            <Button.Text ml={4} mainColor={baseColors.white} onClick={() => history.goBack()}>
              Cancel
            </Button.Text>
          </Box>
        )}
      </Flex>

      <StyledCreateSchema
        onSchemaSaved={(schema) => {
          history.push(generatePath(routes.SCHEMA, { slug: schema.slug }));
          console.log("@TODO/tobek");
        }}
      />

      <Box bg={colors.darkGray} height={6} />
    </GlobalLayout>
  );
};
