import * as React from "react";
import { Box, Flex } from "rimble-ui";
import styled from "styled-components";
import { colors, baseColors, Nav, SertoSchemasLogo } from "serto-ui";
import { AuthButtons } from "../views/Auth/AuthButtons";
import { Footer } from "./Footer";

export const PAGE_WIDTH = "1440px";
export const CONTENT_WIDTH = "1170px";

const NavWrapper = styled(Box)`
  display: inline-block;

  & > div {
    display: inline-block;
    margin: 0 12px;
  }
  svg {
    display: none;
  }
  span {
    font-size: 16px;
  }
  a span {
    color: ${baseColors.blurple};
  }
  a:hover span {
    color: ${baseColors.black};
  }
`;

export interface GlobalLayoutProps {
  url: string;
  headerContent?: JSX.Element;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  return (
    <>
      <Flex maxWidth={PAGE_WIDTH} m="auto" px={5} height="72px" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <SertoSchemasLogo />
          <NavWrapper ml={4}>
            <Nav currentUrl={props.url} />
          </NavWrapper>
        </Flex>
        <Box>
          <AuthButtons />
        </Box>
      </Flex>
      {props.headerContent && (
        <Box backgroundColor={colors.darkGray} color={baseColors.white}>
          {props.headerContent}
        </Box>
      )}
      <Box backgroundColor={baseColors.white}>
        <Box maxWidth={CONTENT_WIDTH} m="auto" px={5}>
          {props.children}
        </Box>
        <Box borderTop={`1px solid ${colors.lightGray}`}>
          <Box maxWidth={PAGE_WIDTH} m="auto" p={5}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
};
