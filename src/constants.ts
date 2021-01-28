export enum routes {
  HOMEPAGE = "/",
  LOGIN = "/login",
  ACCEPT_INVITE = "/acceptInvite/:jwt",
  ONBOARDING = "/onboarding",
  CREATE_ORGANIZATION = "/create-organization",
  FEEDS = "/feeds",
  CREDENTIALS = "/credentials/:tabName?",
  SCHEMAS = "/schemas/:tabName?",
  IDENTITIES = "/identities",
  SETTINGS = "/settings/:tabName?",
  DEVELOPER = "/developer/:tabName?",
}

export const links = {
  EMAIL_SUPPORT: "help@consensys.id",
  DOCUMENTATION: "https://docs.consensys.id/docs/",
};

export const featureFlags = {
  FEEDS: "feeds",
  VC_WIP: "vc-wip", // WIP VC features like publish to feed, revocable, received VCs tab
};
