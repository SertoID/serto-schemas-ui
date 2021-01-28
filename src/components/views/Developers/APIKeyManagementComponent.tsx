import React, { useContext, useState } from "react";
import useSWR, { mutate } from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { AddCircle } from "@rimble/icons";
import { Box, Button, Field, Flash, Flex, Input, Loader, Table, Text } from "rimble-ui";
import {
  baseColors,
  colors,
  CopyableTruncatableText,
  ModalWithX,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SecondaryHeader,
  TBody,
  TH,
  THead,
  TR,
} from "serto-ui";

export const APIKeyManagementComponent: React.FunctionComponent = () => {
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);
  const activeTenantID = TrustAgent.getAuth()?.tenantid;
  const [createError, setCreateError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [apiKeyName, setApiKeyName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReceiveApiKeyModalOpen, setIsReceiveApiKeyModalOpen] = useState(false);
  const [apiKeyToDeleteName, setApiKeyToDeleteName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { data, error: getFeedsError, isValidating } = useSWR("/v1/tenant/apiKeys", () => TrustAgent.getApiKeys());

  const createApiKey = async () => {
    if (!apiKeyName) {
      setCreateError("Please supply a name.");
      return;
    }

    setCreateError("");
    setCreateLoading(true);

    try {
      const resp = await TrustAgent.createApiKey({
        keyName: apiKeyName,
      });
      setApiKeyName("");
      setApiKey(resp.apiKey);
      await mutate("/v1/tenant/apiKeys");
      setIsCreateModalOpen(false);
      setIsReceiveApiKeyModalOpen(true);
    } catch (err) {
      console.error("failed to create api key:", err);
      setCreateError("Error: " + err.message);
    }

    setCreateLoading(false);
  };

  const confirmReceiptOfApiKey = async () => {
    setApiKey("");
    setIsReceiveApiKeyModalOpen(false);
  };

  const deleteApiKey = async () => {
    if (!apiKeyToDeleteName) {
      setDeleteError("Error deleting this key. Please contact customer support.");
      return;
    }

    setDeleteError("");
    setDeleteLoading(true);

    try {
      await TrustAgent.deleteApiKey({
        keyName: apiKeyToDeleteName,
      });
      setApiKeyToDeleteName("");
      await mutate("/v1/tenant/apiKeys");
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("failed to delete api key:", err);
      setDeleteError(err.message);
    }
    setDeleteLoading(false);
  };

  return (
    <>
      <SecondaryHeader heading="API Keys" activeTenantID={activeTenantID}>
        <Button onClick={() => setIsCreateModalOpen(true)} size="small">
          <AddCircle size="14px" mr={1} color={colors.primary.disabled} />
          Create API Key
        </Button>
      </SecondaryHeader>
      {data && data.length > 0 ? (
        <>
          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <THead>
                <TR>
                  <TH>Name</TH>
                  <TH>Hash</TH>
                  <TH />
                </TR>
              </THead>
              <TBody>
                {data.map((apiKey: any, i: number) => {
                  return (
                    <TR key={i}>
                      <td>
                        <Text.span fontWeight={3}>{apiKey.name}</Text.span>
                      </td>
                      <td>{apiKey.hash}</td>
                      <td style={{ textAlign: "right" }}>
                        <Button.Outline
                          onClick={() => {
                            setApiKeyToDeleteName(apiKey.name);
                            setIsDeleteModalOpen(true);
                          }}
                          size="small"
                        >
                          Delete
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
            <Loader color={colors.primary.base} size={5} />
          </Flex>
        </Box>
      ) : getFeedsError ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Error loading api keys: {getFeedsError.toString()}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flex alignItems="center" justifyContent="center" minHeight={8}>
            <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
              <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
                <b style={{ display: "block", fontWeight: 600 }}>You do not have any api keys.</b>
                Create an API Key to use Trust Agent programatically.
              </Text.span>
              <Flex alignItems="center" justifyContent="center">
                <Button onClick={() => setIsCreateModalOpen(true)} size="small" mt={5} mx="auto">
                  Create API Key
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}

      <ModalWithX isOpen={isCreateModalOpen} close={() => setIsCreateModalOpen(false)} borderRadius={2} width="425px">
        <ModalHeader>Create API Key</ModalHeader>
        <ModalContent>
          <Field width="100%" label="Name your API key">
            <Input
              type="text"
              width="100%"
              required={true}
              value={apiKeyName}
              onChange={(event: any) => setApiKeyName(event.target.value)}
            />
          </Field>

          {createError && (
            <Box p={1} mb={1}>
              <Flash my={3} variant="danger">
                {createError}
              </Flash>
            </Box>
          )}
        </ModalContent>
        <ModalFooter mb={1}>
          <Button onClick={createApiKey} disabled={createLoading} width="100%">
            {createLoading || isValidating ? <Loader color="white" /> : "Generate API Key"}
          </Button>
        </ModalFooter>
      </ModalWithX>

      <ModalWithX isOpen={isReceiveApiKeyModalOpen} close={confirmReceiptOfApiKey} borderRadius={2} width="425px">
        <ModalHeader>Create API Key</ModalHeader>
        <ModalContent>
          <Flash my={3} variant="success">
            <Text>
              Your API Key has been generated. Please copy this API Key and save it in a safe place, as you will not be
              able to see it again.
            </Text>
          </Flash>
          <Text fontSize={1} fontWeight={3} mb={2}>
            API Key
          </Text>
          <CopyableTruncatableText text={apiKey} textButton />
        </ModalContent>
        <ModalFooter mb={1}>
          <Button.Outline onClick={confirmReceiptOfApiKey} mt={2} width="100%">
            Done
          </Button.Outline>
        </ModalFooter>
      </ModalWithX>

      <ModalWithX isOpen={isDeleteModalOpen} close={() => setIsDeleteModalOpen(false)} borderRadius={2} width="425px">
        <ModalHeader>Delete API Key</ModalHeader>
        <ModalContent>
          <Text fontSize={1} fontWeight={3} mb={2}>
            API Key
          </Text>
          <Text mb={2}>{apiKeyToDeleteName}</Text>

          {deleteError && (
            <Box p={1} mb={1}>
              <Flash my={3} variant="danger">
                {deleteError}
              </Flash>
            </Box>
          )}
        </ModalContent>
        <ModalFooter mb={1}>
          <Button onClick={deleteApiKey} disabled={deleteLoading} variant="danger" width="100%">
            Delete
          </Button>
        </ModalFooter>
      </ModalWithX>
    </>
  );
};
