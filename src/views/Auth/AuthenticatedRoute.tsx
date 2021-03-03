import React from "react";
import { Redirect, Route } from "react-router-dom";
import { routes } from "../../constants";
import { useAuth } from "../../services/useAuth";
import { Flex, Loader } from "rimble-ui";

export const AuthenticatedRoute = ({ ...otherProps }: { [key: string]: any }): JSX.Element => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Loader size={5} />
      </Flex>
    );
  }

  if (!isAuthenticated) {
    logout();
    return <Redirect to={routes.LOGIN} />;
  }

  return <Route {...otherProps} />;
};
