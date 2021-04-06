import styled from "styled-components";
import * as React from "react";
import { Link, generatePath } from "react-router-dom";
import { Box, Button, Loader } from "rimble-ui";
import { AccountCircle, KeyboardArrowDown } from "@rimble/icons";
import { colors, baseColors } from "serto-ui";
import { useAuth } from "../../services/useAuth";
import { LogOut } from "./LogOut";
import { routes } from "../../constants";

const Popup = styled(Box)`
  display: none;
  position: absolute;
  right: -12px;
  background: ${baseColors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  min-width: 180px;
  font-size: 14px;

  a {
    display: block;
    text-decoration: none;
    color: ${baseColors.black};
  }
  a:hover {
    color: ${baseColors.blurple};
  }

  &:before {
    content: "";
    position: absolute;
    right: 11px;
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${colors.lightGray};
  }
  &:after {
    content: "";
    position: absolute;
    right: 12px;
    top: -9px;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid ${baseColors.white};
  }
`;
const AccountWrap = styled(Box)`
  position: relative;
  z-index: 1;
  &:hover ${Popup} {
    display: block;
  }
  svg + svg {
    top: -4px;
    position: relative;
  }
`;
const PopupGroup = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.lightGray};
  &:last-child {
    border-bottom: 0;
  }
`;

export const AuthButtons: React.FunctionComponent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <Loader />;
  } else if (isAuthenticated) {
    return (
      <AccountWrap py={2} pl={4}>
        <AccountCircle size="32px" />
        <KeyboardArrowDown size="20px" color={baseColors.blurple} />
        <Popup>
          <PopupGroup>
            Signed in as <b>@TODO</b>
          </PopupGroup>
          <PopupGroup>
            <Box mb="12px">
              <Link to={generatePath(routes.SCHEMAS)}>Your schemas</Link>
            </Box>
            {/*@TODO/tobek Update when we have saved schemas*/}
            <Box>
              <Link to={generatePath(routes.SCHEMAS)}>Your saved schemas</Link>
            </Box>
          </PopupGroup>
          <PopupGroup>
            <LogOut asLink={true} />
          </PopupGroup>
        </Popup>
      </AccountWrap>
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
