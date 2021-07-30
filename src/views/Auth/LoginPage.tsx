import React from "react";
import { Redirect, useHistory, generatePath } from "react-router-dom";
import { routes } from "../../constants";
import { Box, Button, Card, Flash } from "rimble-ui";
import { colors, H2 } from "serto-ui";
import { ErrorUserNameUnique, ErrorUserNotFound, ErrorLogin, ErrorSignup } from "../../components/text";
import { useAuth } from "../../services/useAuth";

export const LoginPage = (): JSX.Element => {
  const history = useHistory();
  const { login, signup, logout, isAuthenticated } = useAuth();

  const urlParams = new URLSearchParams(window.location.search);
  const errorMessage = urlParams.get("err") || "";

  let errorComponent: JSX.Element | undefined;
  // @TODO Temporarily checking for error text until API is fixed to include error codes (https://www.notion.so/Return-error-codes-from-API-b6157469e8fd48358b48a9dba646181c)
  if (errorMessage.includes("312") || errorMessage.includes("User not found")) {
    errorComponent = <ErrorUserNotFound />;
  } else if (errorMessage.includes("455") || errorMessage.includes("must be unique")) {
    errorComponent = <ErrorUserNameUnique />;
  } else if (errorMessage.includes("sign up")) {
    errorComponent = <ErrorSignup />;
  } else if (errorMessage) {
    errorComponent = <ErrorLogin />;
  }

  async function doLogin() {
    if (urlParams.get("err")) {
      history.replace(routes.LOGIN);
    }
    try {
      const succeeded = await login();
      if (succeeded) {
        history.push(routes.HOMEPAGE);
      }
    } catch (err) {
      console.error("error logging in:", err);
      const error = "Failed to log in: " + err.toString();
      logout({
        returnTo: window.location.origin + routes.LOGIN + "?err=" + encodeURIComponent(error),
      });
    }
  }

  async function doSignup() {
    if (urlParams.get("err")) {
      history.replace(routes.LOGIN);
    }
    try {
      const succeeded = await signup();
      if (succeeded) {
        history.push(generatePath(routes.SCHEMAS)); // @TODO/tobek Change this back to routes.ONBOARDING when that page is set up
      }
    } catch (err) {
      console.error("error signing up:", err);
      const error = "Failed to sign up: " + err.toString();
      logout({
        returnTo: window.location.origin + routes.LOGIN + "?err=" + encodeURIComponent(error),
      });
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

        {errorComponent && (
          <Box p={1} mb={1}>
            <Flash my={3} variant="danger">
              {errorComponent}
            </Flash>
          </Box>
        )}
      </Card>
    </Box>
  );
};
