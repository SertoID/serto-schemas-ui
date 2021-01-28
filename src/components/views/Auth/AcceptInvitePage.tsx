import React, { useContext, useState } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { routes } from "../../../constants";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { Box, Button, Card, Flash, Flex, Loader, Text } from "rimble-ui";
import { Person } from "@rimble/icons";
import { baseColors, colors, H3 } from "serto-ui";
import { ErrorUserNameUnique, ErrorUserNotFound, ErrorLogin, ErrorSignup } from "../../elements/text";

export interface AcceptInviteProps {
  match: any;
}

const AcceptInviteWrap: React.FunctionComponent = (props) => (
  <Flex bg={baseColors.white} height="100vh" justifyContent="center" pt="10%" width="100%">
    <Box>
      <H3 color={colors.primary.base} lineHeight="1" mt={0} mb={3} textAlign="center">
        Welcome! You’ve been invited to "Organization Name".
      </H3>
      {props.children}
    </Box>
  </Flex>
);

// TODO(sruddy) replace "organization name" and "product name"
export const AcceptInvitePage: React.FunctionComponent<AcceptInviteProps> = (props) => {
  const history = useHistory();
  const { loginWithPopup, getIdTokenClaims, logout } = useAuth0();
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);
  const { data: user, isValidating } = useSWR("/v1/users/currentUser", () => TrustAgent.getUser());

  const jwt = props.match.params.jwt;

  const [error, setError] = useState<any | undefined>();
  const [isAuthenticated, setAuthenticated] = useState(TrustAgent.isAuthenticated());
  const [isLoading, setIsLoading] = useState(false);

  const doLogout = () => {
    TrustAgent.logout();
    logout({ returnTo: window.location.origin + routes.LOGIN });
  };

  async function doLogin() {
    try {
      await loginWithPopup();
      const token = await getIdTokenClaims();
      setIsLoading(true);
      await TrustAgent.login(token.__raw);
      setAuthenticated(true);
    } catch (err) {
      setIsLoading(false);
      console.error("error logging in:", err);
      if (err.toString().includes("312")) {
        setError(ErrorUserNotFound);
      } else {
        setError(ErrorLogin);
      }
      doLogout();
    }
  }

  async function doSignup() {
    try {
      await loginWithPopup({ screen_hint: "signup" });
      const token = await getIdTokenClaims();
      setIsLoading(true);
      await TrustAgent.signup(token.__raw);
      setAuthenticated(true);
    } catch (err) {
      setIsLoading(false);
      console.error("error signing up:", err);
      if (err.toString().includes("455")) {
        setError(ErrorUserNameUnique);
      } else {
        setError(ErrorSignup);
      }
      doLogout();
    }
  }

  async function acceptInvite() {
    try {
      setIsLoading(true);
      await TrustAgent.acceptInvite(jwt);
      history.push(routes.HOMEPAGE);
    } catch (err) {
      setIsLoading(false);
      console.error("error accept invite:", err);
    }
  }

  function logOut() {
    setIsLoading(false);
    setAuthenticated(false);
    TrustAgent.logout();
    logout();
  }

  if (isAuthenticated && user) {
    const email = user.email;
    return (
      <AcceptInviteWrap>
        <Card border={0} borderRadius={2} m="auto" width="472px">
          <Flex alignItems="center" mb={3}>
            <Person color={colors.primary.base} mr={2} />{" "}
            <Text.span fontSize={3} fontWeight={3}>
              {email}
            </Text.span>
          </Flex>
          <Button onClick={acceptInvite} mb={4} width="100%">
            Join "Organization Name"
          </Button>
          <Button.Text onClick={logOut} width="100%">
            Want to join with a different account? Log out
          </Button.Text>
        </Card>
      </AcceptInviteWrap>
    );
  }

  if (isValidating || isLoading) {
    return (
      <AcceptInviteWrap>
        <Flex justifyContent="center">
          <Loader size={5} mt={6} />
        </Flex>
      </AcceptInviteWrap>
    );
  }

  return (
    <AcceptInviteWrap>
      <Text.p mb={6} textAlign="center">
        Create or log into your Verifiable Data Platform account to continue
      </Text.p>
      <Flex justifyContent="center">
        <Box width="425px">
          <Button onClick={doSignup} mb={3} width="100%">
            Create account
          </Button>
          <Button.Outline onClick={doLogin} mb={3} width="100%">
            Login
          </Button.Outline>

          {error && (
            <Box p={1} mb={1}>
              <Flash my={3} variant="danger">
                {error}
              </Flash>
            </Box>
          )}
        </Box>
      </Flex>
    </AcceptInviteWrap>
  );
};
