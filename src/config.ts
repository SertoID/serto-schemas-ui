import { config as sertoUiConfig, SertoUiConfig, mergeServerConfig } from "serto-ui";

export interface ConfigType extends SertoUiConfig {
  AUTH0_CLIENT_ID: string;
  AUTH0_DOMAIN: string;
}

const defaultConfig: ConfigType = {
  ...sertoUiConfig,
  // SCHEMAS_API_URL: "http://localhost:8083",
  SCHEMAS_UI_URL: window.location.origin,
  AUTH0_CLIENT_ID: "WRVmn2NOJSGpBFTIF7cJFIkZBMZ6j9Cc",
  AUTH0_DOMAIN: "auth.serto.id",
};

export const config = mergeServerConfig(defaultConfig);
