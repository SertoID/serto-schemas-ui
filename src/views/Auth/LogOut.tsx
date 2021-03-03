import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import { routes } from "../../constants";
import { Button } from "rimble-ui";

export const LogOut: React.FunctionComponent = () => {
  const { logout } = useAuth();
  const history = useHistory();

  function logOut(event: React.MouseEvent) {
    event.preventDefault();
    logout();
    history.push(routes.LOGIN);
  }

  return (
    <Button.Outline onClick={logOut} size="small" mt={3} width="100%">
      Log Out
    </Button.Outline>
  );
};
