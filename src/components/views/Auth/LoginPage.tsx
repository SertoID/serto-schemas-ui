import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Box, Button, Card, Flash, Heading, Text } from "rimble-ui";
import { useAuth0 } from "@auth0/auth0-react";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { routes } from "../../../constants";
import { colors } from "../../elements/themes";

export const LoginPage = () => {
  const { loginWithPopup, getIdTokenClaims } = useAuth0();
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const history = useHistory();

  async function doLogin() {
    try {
      await loginWithPopup();
      const token = await getIdTokenClaims();
      console.log({ token });
      await TrustAgent.login(token.__raw);
      history.push(routes.HOMEPAGE);
    } catch (err) {
      console.error("error logging in:", err);
      setError("Login failed: " + err.message);
    }
  }

  async function doSignup() {
    try {
      await loginWithPopup();
      const token = await getIdTokenClaims();
      console.log({ token });
      await TrustAgent.signup(token.__raw);
      history.push(routes.ONBOARDING);
    } catch (err) {
      console.error("error logging in:", err);
      setError("Login failed: " + err.message);
    }
  }

  if (TrustAgent.isAuthenticated()) {
    return <Redirect to={routes.HOMEPAGE} />;
  }

  return (
    <Box bg={colors.primary.base} height="100vh" width="100%">
      <Card
        borderTopRightRadius={5}
        borderBottomRightRadius={5}
        bottom={0}
        left={0}
        position="fixed"
        top={0}
        width="525px"
      >
        <Heading color={colors.primary.base} fontSize={7} fontWeight={4} lineHeight="1" mt={7} mb={6}>
          Business
          <br />
          You Can Trust
        </Heading>
        <Text fontSize={4} fontWeight={3} mb={5}>
          Login to TrustAgent
        </Text>
        <Box width="100%">
          <Button onClick={doLogin} mb={3} width="100%">
            Login
          </Button>
          <Button.Outline onClick={doSignup} mb={3} width="100%">
            Signup
          </Button.Outline>
        </Box>

        {error && (
          <Box p={1} mb={1}>
            <Flash my={3} variant="danger">
              {error}
            </Flash>
          </Box>
        )}
      </Card>
    </Box>
  );
};