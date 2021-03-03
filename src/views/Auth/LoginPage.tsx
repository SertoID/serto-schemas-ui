import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { routes } from "../../constants";
import { Box, Button, Card, Flash } from "rimble-ui";
import { colors, H2 } from "serto-ui";
import { ErrorUserNameUnique, ErrorUserNotFound, ErrorLogin, ErrorSignup } from "../../components/text";
import { useAuth } from "../../services/useAuth";

export const LoginPage = (): JSX.Element => {
  const { login, signup, logout, isAuthenticated } = useAuth();

  const [error, setError] = useState<any | undefined>();
  const history = useHistory();

  async function doLogin() {
    try {
      const succeeded = await login();
      if (succeeded) {
        history.push(routes.HOMEPAGE);
      }
    } catch (err) {
      console.error("error logging in:", err);
      if (err.toString().includes("312")) {
        setError(ErrorUserNotFound);
      } else {
        setError(ErrorLogin);
      }
      logout();
    }
  }

  async function doSignup() {
    try {
      const succeeded = await signup();
      if (succeeded) {
        history.push(routes.ONBOARDING);
      }
    } catch (err) {
      console.error("error signing up:", err);
      if (err.toString().includes("455")) {
        setError(ErrorUserNameUnique);
      } else {
        setError(ErrorSignup);
      }
      logout();
    }
  }

  if (isAuthenticated) {
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
          Log in to Serto Schemas
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
