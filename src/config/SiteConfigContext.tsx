import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG, SiteConfig } from './siteConfig';

interface SiteConfigContextType {
  config: SiteConfig;
  isLoading: boolean;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
}

const STORAGE_KEY = 'chang_runtime_site_config';

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: SITE_CONFIG,
  isLoading: false,
  updateConfig: () => {},
  resetConfig: () => {},
});

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        return {
          ...SITE_CONFIG,
          ...parsed,
          pricing: {
            ...SITE_CONFIG.pricing,
            ...(parsed.pricing || {})
          },
          branches: {
            ...SITE_CONFIG.branches,
            ...(parsed.branches || {})
          },
          socialLinks: {
            ...SITE_CONFIG.socialLinks,
            ...(parsed.socialLinks || {})
          }
        };
      }
    } catch {
      // fallback
    }
    return SITE_CONFIG;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Attempt to dynamically fetch config.json from root
    const fetchRuntimeConfig = async () => {
      try {
        const response = await fetch('config.json', { cache: 'no-store' });
        if (response.ok) {
          const remoteConfig = await response.json();
          if (remoteConfig && remoteConfig.phone) {
            setConfig((prev) => {
              // If local changes were made in localStorage, keep them, but merge baseline remote
              const local = localStorage.getItem(STORAGE_KEY);
              if (local) return prev;

              return {
                ...prev,
                ...remoteConfig,
                pricing: {
                  ...prev.pricing,
                  ...(remoteConfig.pricing || {})
                },
                branches: {
                  ...prev.branches,
                  ...(remoteConfig.branches || {}),
                },
                socialLinks: {
                  ...prev.socialLinks,
                  ...(remoteConfig.socialLinks || {}),
                },
              };
            });
          }
        }
      } catch {
        // Fallback gracefully to bundled default config if offline
      }
    };

    fetchRuntimeConfig();
  }, []);

  const updateConfig = (newPartial: Partial<SiteConfig>) => {
    setConfig((prev) => {
      const merged: SiteConfig = {
        ...prev,
        ...newPartial,
        pricing: {
          ...prev.pricing,
          ...(newPartial.pricing || {})
        },
        branches: {
          ...prev.branches,
          ...(newPartial.branches || {})
        },
        socialLinks: {
          ...prev.socialLinks,
          ...(newPartial.socialLinks || {})
        }
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // Ignore localStorage error
      }
      return merged;
    });
  };

  const resetConfig = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setConfig(SITE_CONFIG);
  };

  return (
    <SiteConfigContext.Provider value={{ config, isLoading, updateConfig, resetConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfig => {
  const context = useContext(SiteConfigContext);
  return context.config;
};

export const useSiteConfigActions = () => {
  const context = useContext(SiteConfigContext);
  return {
    updateConfig: context.updateConfig,
    resetConfig: context.resetConfig,
    config: context.config
  };
};
