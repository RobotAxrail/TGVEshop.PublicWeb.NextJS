import { StoreTypes } from "@/enums/enums";
import axios from "axios";

interface IMerchant {
  aboutUsBanner?: string;
  aboutUsDescription?: string;
  activated: boolean;
  address: string;
  code: string;
  copyright?: string;
  createdAt: string;
  currency: string;
  domain: string;
  facebookName?: string;
  facebookPixelId?: string;
  facebookUrl?: string;
  favicon?: string;
  googleAnalyticsId?: string;
  googlePlayUrl?: string;
  instagramName?: string;
  instagramUrl?: string;
  isBlocked: boolean;
  linkedInName?: string;
  linkedInUrl?: string;
  logo?: string;
  membershipTierActivated?: boolean;
  merchantId: string;
  name: string;
  notificationEmail: string;
  offlineStore?: boolean;
  onlineStore?: boolean;
  ownerEmail: string;
  ownerName: string;
  phone: string;
  playStoreUrl?: string;
  senderEmail: string;
  seoDescription: string;
  storeType: `${StoreTypes}`;
  seoTitle: string;
  serviceId: string;
  servicePassword: string;
  tax: number;
  tiktokName?: string;
  tiktokUrl?: string;
  twitterName?: string;
  twitterUrl?: string;
  updatedAt: string;
  whatsappNo?: string;
  youtubeName?: string;
  youtubeUrl?: string;
  status: number;
  footerDescription: string;
}

export async function getMerchantData(domain: string) {
  console.log("Domain: ", domain)
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_ECS_API_ENDPOINT + "/getMerchant",
      { domain: domain }
    );

    let merchantResOuput: IMerchant = {
      ...res.data.body,
      status: res.status,


    };
    console.log("merchant data: ", merchantResOuput);
    return merchantResOuput;
  } catch (error) {
    console.log("getmerchant error: ", error);
  }
}
