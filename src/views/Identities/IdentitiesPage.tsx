import * as React from "react";
import useSWR from "swr";
import { routes } from "../../constants";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { Box, Flash, Flex, Loader, Table, Text } from "rimble-ui";
import { baseColors, colors, Header, HeaderBox, TBody, TH, THead, TR, IssueCredentialButton } from "serto-ui";
import { GlobalLayout } from "../../components/layouts";
import { Identifier } from "../../types";

export const IdentitiesPage: React.FunctionComponent = () => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const { data: identities, error: getIdentitiesError, isValidating } = useSWR(
    "/v1/tenant/all",
    () => TrustAgent.getAllIdentifiers(),
    {
      revalidateOnFocus: false,
    },
  );

  const { data: identifiers } = useSWR("/v1/tenant/agent/identityManagerGetIdentities", () =>
    TrustAgent.getTenantIdentifiers(),
  );

  const issuerIdentifiers: Identifier[] = [];
  if (identifiers) {
    identifiers.forEach((id: any) => {
      issuerIdentifiers.push({
        did: id.did,
        provider: id.provider,
      });
    });
  }

  return (
    <GlobalLayout url={routes.IDENTITIES}>
      <HeaderBox>
        <Header heading="Identities" />
      </HeaderBox>
      {identities && identities.length > 0 ? (
        <>
          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <THead>
                <TR>
                  <TH>Organization</TH>
                  <TH>Alias</TH>
                  <TH>DID</TH>
                  <TH />
                </TR>
              </THead>
              <TBody>
                {identities.map((identity: any, i: number) => {
                  return (
                    <TR key={i}>
                      <td>{identity.userName}</td>
                      <td>{identity.alias}</td>
                      <td>
                        <Text.span fontWeight={3} title={identity.did}>
                          {identity.did}
                        </Text.span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {identifiers && (
                          <IssueCredentialButton subjectIdentifier={identity} issuerIdentifiers={issuerIdentifiers} />
                        )}
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
            <Loader color={colors.primary.base} size={5} />
          </Flex>
        </Box>
      ) : getIdentitiesError ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Error loading identities: {getIdentitiesError.toString()}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Unknown Error. Please contact customer support.
          </Flash>
        </Box>
      )}
    </GlobalLayout>
  );
};
