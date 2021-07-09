import * as React from "react";
import { Link, generatePath } from "react-router-dom";
import { Button, Loader, Avatar, Text } from "rimble-ui";
import { AccountCircle, KeyboardArrowDown } from "@rimble/icons";
import { baseColors, Popup, PopupGroup } from "serto-ui";
import { useAuth } from "../../services/useAuth";
import { LogOut } from "./LogOut";
import { routes } from "../../constants";

export const AuthButtons: React.FunctionComponent = () => {
  const { isAuthenticated, isLoading, userData } = useAuth();
  if (isLoading) {
    return <Loader />;
  } else if (isAuthenticated) {
    return (
      <Popup
        popupTopPos="auto"
        popupRightPos={-12}
        arrowOffset={12}
        rimbleProps={{ py: 2, pl: 4 }}
        popupContents={
          <>
            <PopupGroup>
              Signed in
              {(userData?.name || userData?.nickname) && (
                <>
                  {" "}
                  as{" "}
                  <Text display="inline-block" fontWeight={3} fontSize={1}>
                    {userData.name || userData.nickname}
                  </Text>
                </>
              )}
            </PopupGroup>
            <PopupGroup>
              {/*@TODO/tobek add class "selected" if current route*/}
              <Link to={generatePath(routes.SCHEMAS, { tabName: "created" })}>Your schemas</Link>
              <Link to={generatePath(routes.SCHEMAS, { tabName: "saved" })}>Your saved schemas</Link>
            </PopupGroup>
            <PopupGroup>
              <LogOut asLink={true} />
            </PopupGroup>
          </>
        }
      >
        {userData?.picture ? (
          <Avatar src={userData.picture} size="32px" display="inline-block" />
        ) : (
          <AccountCircle size="32px" />
        )}
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
