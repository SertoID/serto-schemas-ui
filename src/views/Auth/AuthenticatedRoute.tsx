import React from "react";
import { Redirect, Route } from "react-router-dom";
import { routes } from "../../constants";
import { useAuth } from "../../services/useAuth";
import { Flex, Loader } from "rimble-ui";

export interface AuthenticatedRouteProps {
  redirect?: string;
  [key: string]: any;
}
export const AuthenticatedRoute = ({ redirect, ...otherProps }: AuthenticatedRouteProps): JSX.Element => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Loader size={5} />
      </Flex>
    );
  }

  if (!isAuthenticated) {
    if (!redirect) {
      logout();
    }
    return <Redirect to={redirect || routes.LOGIN} />;
  }

  return <Route {...otherProps} />;
};
