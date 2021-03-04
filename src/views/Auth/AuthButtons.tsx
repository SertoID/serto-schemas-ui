import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Loader } from "rimble-ui";
import { useAuth } from "../../services/useAuth";
import { LogOut } from "./LogOut";
import { routes } from "../../constants";

export const AuthButtons: React.FunctionComponent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <Loader />;
  } else if (isAuthenticated) {
    return <LogOut />;
  } else {
    return (
      <>
        <Button.Outline style={{ width: "100%" }} size="small" as={Link} to={routes.LOGIN}>
          Log In
        </Button.Outline>
        <Button style={{ width: "100%" }} size="small" mt={3} as={Link} to={routes.LOGIN}>
          Sign Up
        </Button>
      </>
    );
  }
  return <></>;
};
