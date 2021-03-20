import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { routes } from "../../constants";
import { Box, Flash, Loader } from "rimble-ui";
import { SertoUiContext, SertoUiContextInterface, baseColors, Header, HeaderBox, SchemaDetail } from "serto-ui";
import { GlobalLayout } from "../../components/GlobalLayout";

export const SchemaPage: React.FunctionComponent = () => {
  const { slug } = useParams<{ slug: string }>();
  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;
  const { data, error } = useSWR(`/v1/schemas/public/${slug}`, () => schemasService.getSchema(slug), {
    revalidateOnFocus: false,
  });
  return (
    <GlobalLayout url={routes.SCHEMA}>
      <HeaderBox>
        <Header heading={data?.name || <Loader size="32px" />} />
      </HeaderBox>

      <Box p={4} bg={baseColors.white} borderRadius={1} flexGrow="1">
        {data ? (
          <SchemaDetail schema={data} />
        ) : error ? (
          <Flash variant="danger">
            Error loading schema "{slug}": {error.toString()}
          </Flash>
        ) : (
          <Loader size="32px" />
        )}
      </Box>
    </GlobalLayout>
  );
};
