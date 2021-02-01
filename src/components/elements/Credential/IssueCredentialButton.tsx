import * as React from "react";
import useSWR, { mutate } from "swr";
import { Button, Loader, Tooltip } from "rimble-ui";
import { IssueVc, ModalWithX } from "serto-ui";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { Identifier } from "../../../types";

export interface IssueCredentialButtonProps {
  subjectIdentifier?: Identifier;
}

export const IssueCredentialButton: React.FunctionComponent<IssueCredentialButtonProps> = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [createIdentifierLoading, setCreateIdentifierLoading] = React.useState(false);
  const [createIdentifierError, setCreateIdentifierError] = React.useState("");
  const [isIssueModalOpen, setIsIssueModalOpen] = React.useState(false);
  const {
    data: identifiersResponse,
    error: getIdentifiersError,
    isValidating: identifiersLoading,
  } = useSWR("/v1/tenant/agent/identityManagerGetIdentities", () => TrustAgent.getTenantIdentifiers());
  const hasIdentifier = !!identifiersResponse?.[0]?.did;

  React.useEffect(() => {
    if (
      !createIdentifierLoading &&
      !identifiersLoading &&
      !getIdentifiersError &&
      identifiersResponse &&
      !hasIdentifier
    ) {
      setCreateIdentifierLoading(true);
      TrustAgent.createTenantIdentifier().then(
        async () => {
          await mutate("/v1/tenant/agent/identityManagerGetIdentities");
          setCreateIdentifierLoading(false);
        },
        (err) => {
          console.error("failed to create identifier:", err);
          setCreateIdentifierError("Failed to create identifier: " + err.toString());
          setCreateIdentifierLoading(false);
        },
      );
    }
  }, [
    TrustAgent,
    createIdentifierLoading,
    identifiersResponse,
    hasIdentifier,
    getIdentifiersError,
    identifiersLoading,
  ]);

  if (!hasIdentifier) {
    if (getIdentifiersError || createIdentifierError) {
      return (
        <Tooltip
          message={`Failed to ${getIdentifiersError ? "load" : "create"} initial identifier (${
            getIdentifiersError || createIdentifierError
          }). Please navigate to Settings > Identifiers to create one in order to issue credentials with it.`}
          placement="left"
        >
          <Button.Outline variant="danger" size="small" icononly icon="ErrorOutline" />
        </Tooltip>
      );
    } else if (identifiersLoading || createIdentifierLoading) {
      return (
        <Tooltip message="Creating initial identifier..." placement="left">
          <Button.Outline size="small">
            <Loader />
          </Button.Outline>
        </Tooltip>
      );
    }
  }

  return (
    <>
      <Button.Outline size="small" onClick={() => setIsIssueModalOpen(true)}>
        Issue Credential
      </Button.Outline>
      <ModalWithX isOpen={isIssueModalOpen} close={() => setIsIssueModalOpen(false)} minWidth={9} maxWidth={11}>
        <IssueVc
          subjectIdentifier={props.subjectIdentifier}
          identifiers={identifiersResponse!} // eslint-disable-line
          onComplete={() => setIsIssueModalOpen(false)}
        />
      </ModalWithX>
    </>
  );
};
