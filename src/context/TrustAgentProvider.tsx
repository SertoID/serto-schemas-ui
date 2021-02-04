import * as React from "react";
import { FeatureFlagService } from "../services/FeatureFlagService";
import { TrustAgencyService } from "../services/TrustAgencyService";

// typescript hack to get around having to initialize the context objects
export const TrustAgencyContext = React.createContext<TrustAgencyService>({} as TrustAgencyService);
export const FeatureFlagContext = React.createContext<FeatureFlagService>({} as FeatureFlagService);

export interface TrustAgencyProviderProps {
  featureFlags?: string[];
}

export const TrustAgencyProvider: React.FunctionComponent<TrustAgencyProviderProps> = ({ children, featureFlags }) => {
  const trustAgent = React.useMemo(() => new TrustAgencyService(), []);
  const features = new FeatureFlagService(featureFlags);

  return (
    <TrustAgencyContext.Provider value={trustAgent}>
      <FeatureFlagContext.Provider value={features}>{children}</FeatureFlagContext.Provider>
    </TrustAgencyContext.Provider>
  );
};
