import { config } from "../config";

const AUTH_LOCALSTORAGE_KEY = `trust-agent-auth-${config.API_URL}`;

export interface Auth {
  jwt: string;
}
export class SchemasUserService {
  private loggingIn?: boolean;
  public auth?: Auth;
  public url = config.API_URL;

  constructor() {
    this.loadAuthFromStorage();
    this.onDocumentReady();
  }

  public getAuth(): Auth | undefined {
    return this.auth;
  }

  public async signup(jwt: string): Promise<any> {
    this.loggingIn = true;
    const user = await this.request("/v1/user/signup", "POST", { userToken: jwt }, true);
    console.log({ user });
    this.setAuth({ jwt }, true);
    this.loggingIn = false;
  }

  public async login(jwt: string): Promise<any> {
    this.loggingIn = true;
    this.setAuth({ jwt });
    const user = await this.request("/v1/user/currentUser");
    console.log({ user });
    this.setAuth({ jwt }, true);
    this.loggingIn = false;

    this.authenticateExtension(jwt);
  }

  public async getUser(): Promise<any> {
    return this.request("/v1/user/currentUser");
  }

  public logout(): void {
    this.clearAuth();
  }

  public isAuthenticated(): boolean {
    return !!this.auth && !this.loggingIn;
  }

  private async request(
    path: string,
    method: "GET" | "DELETE" | "POST" = "GET",
    body?: any,
    unauthenticated?: boolean,
  ): Promise<any> {
    if (!unauthenticated) {
      this.ensureAuthenticated();
    }

    const headers: any = {};
    if (this.auth?.jwt) {
      headers.authorization = `Bearer ${this.auth.jwt}`;
    }
    if (body) {
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`${this.url}${path}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    const responseIsJson = response.headers.get("content-type")?.indexOf("application/json") === 0;

    if (!response.ok) {
      if (response.status === 401) {
        // TODO: refresh token instead of logging out
        this.logout();
      }

      let errorMessage;
      if (responseIsJson) {
        const errorJson = await response.json();
        if (errorJson?.error?.message) {
          errorMessage = errorJson.error.message;
          if (errorJson.error.code) {
            errorMessage += ` (${errorJson.error.code})`;
          }
        } else {
          errorMessage = JSON.stringify(errorJson);
        }
      } else {
        errorMessage = await response.text();
      }
      console.error("API error", response.status, errorMessage);
      throw new Error("API error: " + errorMessage);
    }

    if (responseIsJson) {
      try {
        return await response.json();
      } catch (err) {
        if (response.headers.get("content-length") === "0") {
          throw new Error('API error: API returned invalid JSON: ""');
        }
        throw err;
      }
    } else {
      return await response.text();
    }
  }

  /**
   * Authenticate wallet extension
   */
  private authenticateExtension(token: string) {
    if ((window as any).idWallet) {
      (window as any).idWallet.authenticate(token);
    }
  }

  /**
   * Wait for page to load and check we have required args before trying to authenticate
   */
  private onDocumentReady() {
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        const auth = this.getAuth();
        if (auth?.jwt) {
          this.authenticateExtension(auth.jwt);
        }
      }
    };
  }

  private setAuth(auth: Auth, persist?: boolean) {
    this.auth = auth;
    if (persist) {
      localStorage.setItem(AUTH_LOCALSTORAGE_KEY, JSON.stringify(auth));
    }
  }

  private clearAuth() {
    delete this.auth;
    localStorage.removeItem(AUTH_LOCALSTORAGE_KEY);
  }

  private ensureAuthenticated() {
    if (!this.auth) {
      throw new Error("not authenticated");
    }
  }

  private loadAuthFromStorage(): void {
    const authString = localStorage.getItem(AUTH_LOCALSTORAGE_KEY);

    if (authString === "" || authString === null) {
      return;
    }

    try {
      const auth = JSON.parse(authString);
      this.auth = auth;
    } catch (err) {
      console.error("failed to parse auth", authString);
    }
  }
}
