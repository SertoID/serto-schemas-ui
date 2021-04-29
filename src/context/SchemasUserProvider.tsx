import * as React from "react";
import { FeatureFlagService } from "../services/FeatureFlagService";
import { SchemasUserService } from "../services/SchemasUserService";

// typescript hack to get around having to initialize the context objects
export const SchemasUserContext = React.createContext<SchemasUserService>({} as SchemasUserService);
export const FeatureFlagContext = React.createContext<FeatureFlagService>({} as FeatureFlagService);

export interface SchemasUserProviderProps {
  featureFlags?: string[];
}

export const SchemasUserProvider: React.FunctionComponent<SchemasUserProviderProps> = ({ children, featureFlags }) => {
  const schemasUserService = React.useMemo(() => new SchemasUserService(), []);
  const features = new FeatureFlagService(featureFlags);

  return (
    <SchemasUserContext.Provider value={schemasUserService}>
      <FeatureFlagContext.Provider value={features}>{children}</FeatureFlagContext.Provider>
    </SchemasUserContext.Provider>
  );
};
