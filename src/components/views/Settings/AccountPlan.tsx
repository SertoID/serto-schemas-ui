import * as React from "react";
import { freeAccount } from "../../../constants";
import { Box, Button, Flex, Text } from "rimble-ui";
import { H4 } from "../../elements/layouts";
import { colors } from "../../elements/themes";

export interface RowProps {
  amount: string;
  name: string;
}

export const Row: React.FunctionComponent<RowProps> = (props) => {
  return (
    <Flex alignItems="center" mb={2}>
      <Flex justifyContent="flex-end" mr={2} width="100px">
        <Text.span bg="#EDECFA" borderRadius={1} fontWeight={3} lineHeight="solid" px={2} py={1}>
          {props.amount}
        </Text.span>
      </Flex>
      <Box>{props.name}</Box>
    </Flex>
  );
};

export const AccountPlan: React.FunctionComponent = (props) => {
  return (
    <Box p={3}>
      <Flex border={1} borderColor={colors.success.base} borderRadius={2} mb={5} padding={4}>
        <Box mr={4} width="150px">
          <H4 color={colors.success.base} mb={3} mt={0}>
            Current Plan
          </H4>
          <Text.span fontWeight={3}>Free</Text.span>
        </Box>
        <Box flexGrow="2">
          <Row amount={"0/" + freeAccount.USERS} name="Users" />
          <Row amount={"0/" + freeAccount.VC_ISSUED} name="Verifiable Credentials Issued" />
          <Row amount={"0/" + freeAccount.VC_PUB_FEED} name="Credentials Published to Feeds" />
          <Row amount={"0/" + freeAccount.FEEDS_CREATED} name="Feeds Created" />
          <Row amount={"0/" + freeAccount.FEED_SUBSCRIPTIONS} name="Feed Subscriptions" />
        </Box>
        <Box ml={4}>
          <Button onClick={() => console.log("Upgrade to Pro TKTK")} size="small">
            Upgrade to Pro
          </Button>
        </Box>
      </Flex>
      <Flex border={1} borderRadius={2} mb={5} padding={4}>
        <Box mr={4} width="150px">
          <H4 color={colors.primary.base} mb={3} mt={0}>
            Pro Plan
          </H4>
          <Text.span fontWeight={3}>Free During Beta</Text.span>
        </Box>
        <Box flexGrow="2">
          <Row amount="Unlimited" name="Users" />
          <Row amount="Unlimited" name="Verifiable Credentials Issued" />
          <Row amount="Unlimited" name="Credentials Published to Feeds" />
          <Row amount="Unlimited" name="Feeds Created" />
          <Row amount="Unlimited" name="Feed Subscriptions" />
        </Box>
        <Box ml={4}>
          <Button onClick={() => console.log("Choose This Plan TKTK")} size="small">
            Choose This Plan
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
