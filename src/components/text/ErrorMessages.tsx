import * as React from "react";
import { links } from "../../constants";

export const ErrorLogin: React.FunctionComponent = () => (
  <>
    Error logging in, please try again. If this error persists contact{" "}
    <a href={"mailto:" + links.EMAIL_SUPPORT}>{links.EMAIL_SUPPORT}</a>.
  </>
);

export const ErrorSignup: React.FunctionComponent = () => (
  <>
    Error signing up, please try again. If this error persists contact{" "}
    <a href={"mailto:" + links.EMAIL_SUPPORT}>{links.EMAIL_SUPPORT}</a>.
  </>
);

// code: 455
export const ErrorUserNameUnique: React.FunctionComponent = () => (
  <>A user already exists with those credentials - please try logging in.</>
);

// code: 312
export const ErrorUserNotFound: React.FunctionComponent = () => (
  <>No user exists with those credentials - please try creating an account.</>
);
