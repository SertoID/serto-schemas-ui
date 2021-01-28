import React, { useContext, useState } from "react";
import useSWR, { mutate } from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { AddCircle } from "@rimble/icons";
import { Box, Button, Flash, Flex, Loader, Table, Text } from "rimble-ui";
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
import { config } from "../../../config";

export const MemberManagement: React.FunctionComponent = () => {
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);
  const activeTenantID = TrustAgent.getAuth()?.tenantid;
  const [createError, setGetInviteCodeError] = useState("");
  const [getCodeLoading, setGetInviteCodeLoading] = useState(false);
  const [inviteCode, setInviteCodeKey] = useState("");
  const [isCreateModalOpen, setIsGetInviteCodeModalOpen] = useState(false);
  const [isReceiveApiKey, setIsReceiveInviteCode] = useState(false);
  const [memberToDeleteID, setMemberToDeleteID] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteError, setRemoveError] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);

  const { data, error: getMembersError, isValidating } = useSWR("/v1/tenant/members", () =>
    TrustAgent.getTenantMembers(),
  );

  const getInviteCode = async () => {
    setGetInviteCodeError("");
    setGetInviteCodeLoading(true);

    try {
      const resp = await TrustAgent.getInviteCode();
      setInviteCodeKey(resp);
      await mutate("/v1/tenant/members");
      setIsReceiveInviteCode(true);
    } catch (err) {
      setGetInviteCodeError("Error: " + err.message);
    }

    setGetInviteCodeLoading(false);
  };

  const confirmReceiptOfInviteCode = async () => {
    setInviteCodeKey("");
    setIsGetInviteCodeModalOpen(false);
  };

  const removeMember = async () => {
    if (!memberToDeleteID) {
      setRemoveError("Error removing this member. Please contact customer support.");
      return;
    }
    setRemoveError("");
    setRemoveLoading(true);
    try {
      await TrustAgent.removeMember(memberToDeleteID);
      setMemberToDeleteID("");
      await mutate("/v1/tenant/members");
      setIsDeleteModalOpen(false);
    } catch (err) {
      setRemoveError("Error: " + err.message);
    }
    setRemoveLoading(false);
  };
  return (
    <>
      <SecondaryHeader heading="Members" activeTenantID={activeTenantID}>
        <Button onClick={() => setIsGetInviteCodeModalOpen(true)} size="small">
          <AddCircle size="14px" mr={1} color={colors.primary.disabled} />
          Invite a Member
        </Button>
      </SecondaryHeader>
      {data && data.length > 0 ? (
        <>
          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <THead>
                <TR>
                  <TH>Email</TH>
                  <TH>Organization Member ID</TH>
                  <TH>Permissions</TH>
                  <TH />
                </TR>
              </THead>
              <TBody>
                {data.map((member: any, i: number) => {
                  return (
                    <TR key={i}>
                      <td>{member.user.email}</td>
                      <td>{member.user.id}</td>
                      <td>Full access</td>
                      <td style={{ textAlign: "right" }}>
                        <Button.Outline
                          onClick={() => {
                            setMemberToDeleteID(member.user.id);
                            setIsDeleteModalOpen(true);
                          }}
                          size="small"
                        >
                          Remove Member
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
      ) : getMembersError ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Error loading organization members: {getMembersError.toString()}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Unknown Error. Please contact customer support.
          </Flash>
        </Box>
      )}

      <ModalWithX isOpen={isCreateModalOpen} close={confirmReceiptOfInviteCode} borderRadius={2} width="425px">
        <ModalHeader>Get Member Invite</ModalHeader>
        <ModalContent>
          {createError && (
            <Box p={1} mb={1}>
              <Flash my={3} variant="danger">
                {createError}
              </Flash>
            </Box>
          )}
          {!isReceiveApiKey ? (
            <Button onClick={getInviteCode} disabled={getCodeLoading} width="100%">
              {getCodeLoading || isValidating ? <Loader color={baseColors.white} /> : "Get Invite Code"}
            </Button>
          ) : (
            <>
              <Text mb={2}>Send this URL to whoever you'd like to invite</Text>
              <CopyableTruncatableText text={`${config.UI_URL}/acceptInvite/${inviteCode}`} textButton />
            </>
          )}
        </ModalContent>
      </ModalWithX>

      <ModalWithX isOpen={isDeleteModalOpen} close={() => setIsDeleteModalOpen(false)} borderRadius={2} width="425px">
        <ModalHeader>Remove Member</ModalHeader>
        <ModalContent>
          <Text fontSize={2}>Organization Member ID: {memberToDeleteID}</Text>

          {deleteError && (
            <Box p={1} mb={1}>
              <Flash my={3} variant="danger">
                {deleteError}
              </Flash>
            </Box>
          )}
        </ModalContent>
        <ModalFooter mb={1}>
          <Button onClick={removeMember} disabled={removeLoading} variant="danger" width="100%">
            Remove
          </Button>
        </ModalFooter>
      </ModalWithX>
    </>
  );
};
