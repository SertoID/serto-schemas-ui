import { useEffect, useState, useContext } from "react";
import { useAuth0, Auth0ContextInterface } from "@auth0/auth0-react";
import { SchemasUserContext } from "../context/SchemasUserProvider";
import { SchemasUserService } from "./SchemasUserService";
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
  const schemasUserService = useContext<SchemasUserService>(SchemasUserContext);
  const [jwt, setJwt] = useState<string | undefined>(schemasUserService.getAuth()?.jwt);

  useEffect(() => {
    schemasUserService.setOnAuthChange((auth?) => setJwt(auth?.jwt));
    return () => schemasUserService.removeOnAuthChange();
  }, [schemasUserService, setJwt]);

  return {
    isAuthenticated: isAuthenticated && schemasUserService.isAuthenticated(),
    isLoading,
    login: async (options?, config?): Promise<boolean> => {
      await loginWithPopup(options, config);
      const token = await getIdTokenClaims();
      if (!token) {
        console.warn("Undefined token from Auth0 during login - popup cancelled or superceded?");
        return false;
      }
      console.log("logged in", { token });
      await schemasUserService.login({
        jwt: token.__raw,
        jwtExpiry: token.exp,
      });
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
      await schemasUserService.signup({
        jwt: token.__raw,
        jwtExpiry: token.exp,
      });
      return true;
    },
    logout: (options?) => {
      schemasUserService.logout();
      logout({ returnTo: window.location.origin + routes.LOGIN, ...options });
    },
    jwt,
  };
}
