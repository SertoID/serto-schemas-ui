import * as React from "react";
import styled from "styled-components";
import { Box, Flex } from "rimble-ui";
import { baseColors, SertoLogo, links } from "serto-ui";
import { config } from "../config";

const LinkBox = styled(Box)`
  margin-right: 48px;
  &:last-child {
    margin-right: 0;
  }

  p {
    margin: 16px;
  }
  p:first-child {
    margin-top: 0;
    margin-bottom: -4px;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: ${baseColors.black};
  }
  a:hover {
    color: ${baseColors.blurple};
  }
`;
const CompanyBox = styled(Box)`
  text-align: right;
  font-size: 12px;
  p {
    margin: 6px 0;
  }
  p:last-child {
    font-style: italic;
  }
`;

export const Footer: React.FunctionComponent = () => {
  return (
    <Flex justifyContent="space-between">
      <Flex>
        <LinkBox>
          <p>Company</p>
          <p>
            <a href="https://serto.id" target="_blank">
              Serto.id
            </a>
          </p>
          <p>
            <a href={links.SCHEMAS_FEEDBACK} target="_blank">
              Feedback
            </a>
          </p>
        </LinkBox>
        <LinkBox>
          <p>Products</p>
          {/* @TODO Update links when ready */}
          <p>
            <a href="#TODO" target="_blank">
              Serto Agent
            </a>
          </p>
          <p>
            <a href={config.SEARCH_UI_URL} target="_blank">
              Serto Search
            </a>
          </p>
        </LinkBox>
        <LinkBox>
          <p>Social</p>
          <p>
            <a href="https://serto.medium.com/" target="_blank">
              Blog
            </a>
          </p>
          <p>
            <a href="https://twitter.com/serto_id" target="_blank">
              Twitter
            </a>
          </p>
        </LinkBox>
        <LinkBox>
          <p>Info</p>
          <p>
            <a href="https://consensys.net/terms-of-use/" target="_blank">
              Terms
            </a>
          </p>
          <p>
            <a href="https://consensys.net/privacy-policy/" target="_blank">
              Privacy
            </a>
          </p>
        </LinkBox>
      </Flex>
      <CompanyBox>
        <a href="https://serto.id" target="_blank">
          <SertoLogo />
        </a>
        <p>©{new Date().getFullYear()} Serto</p>
        <p>Data meets identity.</p>
      </CompanyBox>
    </Flex>
  );
};
