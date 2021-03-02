// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Workaround for "For security reasons, `window.crypto` is required to run `auth0-spa-js`" Auth0 error (Auth0 expects to be run in a browser context, but in tests it's not, so we need to stub out `window.crypto`):
(window as any).crypto = {
  subtle: {},
};
