import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG, SiteConfig } from './siteConfig';

interface SiteConfigContextType {
  config: SiteConfig;
  isLoading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: SITE_CONFIG,
  isLoading: false,
});

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(SITE_CONFIG);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Attempt to dynamically fetch config.json from root to allow runtime changes by the client
    // without requiring rebuild or developer intervention.
    const fetchRuntimeConfig = async () => {
      try {
        const response = await fetch('config.json', { cache: 'no-store' });
        if (response.ok) {
          const remoteConfig = await response.json();
          if (remoteConfig && remoteConfig.phone) {
            setConfig((prev) => ({
              ...prev,
              ...remoteConfig,
              branches: {
                ...prev.branches,
                ...(remoteConfig.branches || {}),
              },
              socialLinks: {
                ...prev.socialLinks,
                ...(remoteConfig.socialLinks || {}),
              },
            }));
          }
        }
      } catch {
        // Fallback gracefully to bundled default config if offline or fetch fails
      }
    };

    fetchRuntimeConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, isLoading }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfig => {
  const context = useContext(SiteConfigContext);
  return context.config;
};
