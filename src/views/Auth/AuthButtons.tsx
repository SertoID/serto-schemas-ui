import * as React from "react";
import { Link, generatePath } from "react-router-dom";
import { Button, Loader } from "rimble-ui";
import { AccountCircle, KeyboardArrowDown } from "@rimble/icons";
import { baseColors, Popup, PopupGroup } from "serto-ui";
import { useAuth } from "../../services/useAuth";
import { LogOut } from "./LogOut";
import { routes } from "../../constants";

export const AuthButtons: React.FunctionComponent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <Loader />;
  } else if (isAuthenticated) {
    return (
      <Popup
        rimbleProps={{ py: 2, pl: 4 }}
        popupContents={
          <>
            <PopupGroup>
              {/*@TODO/tobek Add avatar and username when supported by API*/}
              Signed in
            </PopupGroup>
            <PopupGroup>
              <Link to={generatePath(routes.SCHEMAS, { tabName: "created" })}>Your schemas</Link>
              <Link to={generatePath(routes.SCHEMAS, { tabName: "saved" })}>Your saved schemas</Link>
            </PopupGroup>
            <PopupGroup>
              <LogOut asLink={true} />
            </PopupGroup>
          </>
        }
      >
        <AccountCircle size="32px" />
        <KeyboardArrowDown size="20px" color={baseColors.blurple} style={{ position: "relative", top: -4 }} />
      </Popup>
    );
  } else {
    return (
      <>
        <Button.Text fontWeight={2} as={Link} to={routes.LOGIN}>
          Log In
        </Button.Text>
        <Button.Outline ml={3} as={Link} to={routes.LOGIN}>
          Sign Up
        </Button.Outline>
      </>
    );
  }
  return <></>;
};
