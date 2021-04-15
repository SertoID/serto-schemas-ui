import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import { routes } from "../../constants";
import { Button } from "rimble-ui";

export interface LogOutProps {
  asLink?: boolean;
}
export const LogOut: React.FunctionComponent<LogOutProps> = (props) => {
  const { logout } = useAuth();
  const history = useHistory();

  function logOut(event: React.MouseEvent) {
    event.preventDefault();
    logout();
    history.push(routes.LOGIN);
  }

  if (props.asLink) {
    return (
      <a href="#" onClick={logOut}>
        Sign out
      </a>
    );
  }
  return (
    <Button.Outline onClick={logOut} size="small" mt={3} width="100%">
      Sign Out
    </Button.Outline>
  );
};
