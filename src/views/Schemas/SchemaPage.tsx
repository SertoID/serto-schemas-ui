import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { routes } from "../../constants";
import { Box, Flash, Loader } from "rimble-ui";
import { SertoUiContext, SertoUiContextInterface, SchemaDetail } from "serto-ui";
import { GlobalLayout } from "../../components/GlobalLayout";

export const SchemaPage: React.FunctionComponent = () => {
  const { slug } = useParams<{ slug: string }>();
  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;
  const { data: schema, error } = useSWR(`/v1/schemas/public/${slug}`, () => schemasService.getSchema(slug), {
    revalidateOnFocus: false,
  });
  return (
    <GlobalLayout url={routes.SCHEMA}>
      {schema ? (
        <Box pt={5} pb={6}>
          <SchemaDetail schema={schema} fullPage={true} />
        </Box>
      ) : error ? (
        <Box py={6}>
          <Flash variant="danger">
            <p>Error loading schema "{slug}":</p>
            <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
          </Flash>
        </Box>
      ) : (
        <Box py={8} textAlign="center">
          <Loader size="32px" m="auto" />
        </Box>
      )}
    </GlobalLayout>
  );
};
