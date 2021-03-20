import { useContext } from "react";
import { useAuth0, Auth0ContextInterface } from "@auth0/auth0-react";
import { TrustAgencyContext } from "../context/TrustAgentProvider";
import { TrustAgencyService } from "./TrustAgencyService";
import { routes } from "../constants";

type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;

/** Wraps both Auth0 and our own auth into a single hook. */
export function useAuth(): {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: ReplaceReturnType<Auth0ContextInterface["loginWithPopup"], Promise<boolean>>;
  signup: ReplaceReturnType<Auth0ContextInterface["loginWithPopup"], Promise<boolean>>;
  logout: Auth0ContextInterface["logout"];
  jwt?: string;
} {
  const { loginWithPopup, getIdTokenClaims, isAuthenticated, isLoading, logout } = useAuth0();
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);

  return {
    isAuthenticated: isAuthenticated && TrustAgent.isAuthenticated(),
    isLoading,
    login: async (options?, config?): Promise<boolean> => {
      await loginWithPopup(options, config);
      const token = await getIdTokenClaims();
      if (!token) {
        console.warn("Undefined token from Auth0 during login - popup cancelled or superceded?");
        return false;
      }
      console.log("logged in", { token });
      await TrustAgent.login(token.__raw);
      return true;
    },
    signup: async (options?, config?) => {
      await loginWithPopup({ screen_hint: "signup", ...options }, config);
      const token = await getIdTokenClaims();
      if (!token) {
        console.warn("Undefined token from Auth0 during signup - popup cancelled or superceded?");
        return false;
      }
      console.log("signed up", { token });
      await TrustAgent.signup(token.__raw);
      return true;
    },
    logout: (options?) => {
      TrustAgent.logout();
      logout({ returnTo: window.location.origin + routes.LOGIN, ...options });
    },
    jwt: TrustAgent.auth?.jwt,
  };
}
