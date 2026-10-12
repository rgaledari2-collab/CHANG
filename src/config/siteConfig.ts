import defaultConfig from '../../public/config.json';

export interface SiteBranch {
  name: string;
  isMain: boolean;
  address: string;
  city: string;
  province: string;
  instagram: string;
  instagramId: string;
}

export interface SiteSocialLinks {
  instagramKhorramshahr: string;
  instagramAbadan: string;
  eitaa: string;
  eitaaId: string;
  whatsapp: string;
}

export interface SitePricing {
  placementDeposit: number;
  regularTuition: number;
}

export interface SiteConfig {
  siteName: string;
  slogan: string;
  phone: string;
  phoneDisplay: string;
  workingHours: string;
  adminPassword?: string;
  pricing?: SitePricing;
  branches: {
    khorramshahr: SiteBranch;
    abadan: SiteBranch;
  };
  socialLinks: SiteSocialLinks;
  adminNotice?: string;
}

export const SITE_CONFIG: SiteConfig = {
  ...defaultConfig,
  adminPassword: (defaultConfig as any).adminPassword || 'chang1403',
  pricing: (defaultConfig as any).pricing || {
    placementDeposit: 150000,
    regularTuition: 1650000
  }
} as SiteConfig;
