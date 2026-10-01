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

export interface SiteConfig {
  siteName: string;
  slogan: string;
  phone: string;
  phoneDisplay: string;
  workingHours: string;
  branches: {
    khorramshahr: SiteBranch;
    abadan: SiteBranch;
  };
  socialLinks: SiteSocialLinks;
  adminNotice?: string;
}

export const SITE_CONFIG: SiteConfig = defaultConfig as SiteConfig;
