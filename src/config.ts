export interface ConfigType {
  ENVIRONMENT: string;
  API_URL: string;
  UI_URL: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_DOMAIN: string;
  FEATURE_FLAGS?: string;
}

const defaultConfig: ConfigType = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  API_URL: "https://staging.api.schemas.serto.id",
  // API_URL: "http://localhost:8000",
  UI_URL: window.location.origin,
  AUTH0_CLIENT_ID: "WRVmn2NOJSGpBFTIF7cJFIkZBMZ6j9Cc",
  AUTH0_DOMAIN: "auth.serto.id",
  FEATURE_FLAGS: process.env.REACT_APP_FEATURE_FLAGS,
};

const serverConfigString = (window as any).SERVER_CONFIG;
let serverConfig: ConfigType | undefined;
if (serverConfigString && serverConfigString !== "$ENVIRONMENT") {
  try {
    serverConfig = JSON.parse(serverConfigString);
  } catch (e) {
    console.error("error parsing server config: ", { serverConfigString, defaultConfig, e });
  }
}

const config: ConfigType = { ...defaultConfig, ...serverConfig };
console.log("configuration loaded", { config, defaultConfig, serverConfig });

export { config };
