import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Box, Button, Card, Flash } from "rimble-ui";
import { useAuth0 } from "@auth0/auth0-react";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { routes } from "../../../constants";
import { colors, H2 } from "serto-ui";
import { ErrorUserNameUnique, ErrorUserNotFound, ErrorLogin, ErrorSignup } from "../../elements/text";

export const LoginPage = () => {
  const { loginWithPopup, getIdTokenClaims, logout, isAuthenticated } = useAuth0();
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = useState<any | undefined>();
  const history = useHistory();

  const doLogout = () => {
    TrustAgent.logout();
    logout({ returnTo: window.location.origin + routes.LOGIN });
  };

  async function doLogin() {
    try {
      await loginWithPopup();
      const token = await getIdTokenClaims();
      if (!token) {
        console.warn("Undefined token from Auth0 - popup cancelled or superceded?");
        return;
      }
      console.log({ token });
      await TrustAgent.login(token.__raw);
      history.push(routes.HOMEPAGE);
    } catch (err) {
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
      console.log({ token });
      await TrustAgent.signup(token.__raw);
      history.push(routes.ONBOARDING);
    } catch (err) {
      console.error("error signing up:", err);
      if (err.toString().includes("455")) {
        setError(ErrorUserNameUnique);
      } else {
        setError(ErrorSignup);
      }
      doLogout();
    }
  }

  if (isAuthenticated && TrustAgent.isAuthenticated()) {
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
        <H2 color={colors.primary.base} mb={5} mt={7}>
          Login to TrustAgent
        </H2>
        <Box width="100%">
          <Button onClick={doLogin} mb={3} width="100%">
            Login
          </Button>
          <Button.Outline onClick={doSignup} mb={3} width="100%">
            Create Account
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
