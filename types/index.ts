import { legalPoliciesType, StoreTypes } from "@/enums/enums";

interface IFaq {
  answer: string;
  createdAt: string;
  createdBy: string;
  faqCategory: string;
  faqId: string;
  faqType: string;
  merchantId: string;
  parentId: string;
  question: string;
  sequence: number;
  updatedAt: string;
  updatedBy: string;
}

export interface IMerchant {
  footerDescription: string;
  merchantId: string;
  merchantRegistrationNumber?: string;
  domain?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  currency: string;
  copyright?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  linkedInUrl?: string;
  googlePlayUrl?: string;
  playStoreUrl?: string;
  whatsappNo: string;
  instagramName?: string;
  twitterName?: string;
  facebookName?: string;
  youtubeName?: string;
  tiktokName?: string;
  linkedInName?: string;
  aboutUsBanner: string;
  aboutUsDescription: string;
  membershipTierActivated?: boolean;
  siteColor: string;
  siteFont: string;
  logo?: string;
  favicon?: string;
  notificationMessage?: string;
  paymentType: string;
  storeType: `${StoreTypes}`;
  storeId: string;
  storeLatitude: string;
  storeLongitude: string;
  preferredLanguage?: string;
  orderOption: Array<string>;
  legalPolicies: {
    isDisabled: boolean;
    merchantId: string;
    policyContent: string;
    policyType: string;
  };
  footerItemLists: Array<{
    display: boolean;
    footerType: legalPoliciesType;
  }>;
  faqList: {
    categories: Array<{
      childItems: Array<IFaq>;
      createdAt: string;
      createdBy: string;
      faqCategoryId: string;
      merchantId: string;
      sequence: number;
      title: string;
      updatedAt: string;
      updatedBy: string;
    }>;
    items: Array<{ category: string; faqContent: Array<IFaq> }>;
    message: string;
    status: boolean;
    faqListFetchStatus: string;
  };
  contactUsInfo: {
    contactUsContent: string;
    contactUsFormEnabled: boolean;
    message: string;
    status: string;
    storeList: Array<{
      address: string;
      city: string;
      contactUsStoreId: string;
      createdAt: string;
      createdBy: string;
      latitude: string;
      longitude: string;
      merchantId: string;
      postalCode: string;
      state: string;
      storeCode: string;
      storeId: string;
      storeName: string;
      updatedAt: string;
      updatedBy: string;
    }>;
    contactUsFetchStatus: string;
  };
  qtyLimitPerOrder: number;
  minimumOrderValue: number;
  exclusiveQtyLimitPerOrder: number;
}

export interface ICustomerFavouriteAddress {
  address: string;
  addressDetail: string;
  city: string;
  country: string;
  createdAt: string;
  customerFavouriteAddressId: string;
  customerId: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  latitude: string;
  longitude: string;
  merchantId: string;
  name: string;
  postalCode: string;
  state: string;
  updatedAt: string;
}

export interface IDispatchOrderModalStateInput {
  type: string;
  data?: {
    view: boolean;
    validateOnOpen: boolean;
    section: string | null;
    addressDetailToEdit: ICustomerFavouriteAddress | null;
    closeAfterSubmitting: false;
  };
}

export interface IkdsGetWarungLandingPageRes {
  address: string;
  operatingHours: Array<{
    close: string;
    day: string;
    open: string;
  }>;
  warungStoreStatus: string;
  orderOption: Array<string>;
}

interface IInput {
  id: string;
  label?: string;
  inputType: string;
  inputProps: Partial<React.InputHTMLAttributes<HTMLInputElement>>;
  validationRegex?: RegExp;
}

export interface IOrderMode {
  title: string;
  unselectedImage: string;
  selectedImage: string;
  inputs: Array<IInput>;
}

export interface IOrderModalState {
  view: boolean;
  validateOnOpen: boolean;
  section: string | null;
  addressDetailToEdit: any;
  closeAfterSubmitting: boolean;
}

export interface IOrderDetails {
  voucherId: string;
  customerFirstName: string;
  customerLastName: string;
  customerMobileNo: string;
  customerPrimaryEmail: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryCountry: string;
  deliveryFee: number;
  deliveryPostalCode: string;
  deliveryState: string;
  grandTotal: number;
  isBankTransfer: boolean;
  manualPaymentMethodName: string;
  manualPaymentOrderStatus: string;
  message: string;
  orderId: string;
  orderNumber: string;
  orderType: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentType: string;
  status: string;
  subtotal: number;
  totalDiscount: number;
}

export interface IPaymentMethod {
  id: string;
  title: string;
  description: string;
  infoText?: string;
  qrCode?: string;
  paymentLink?: string;
}

export interface ILegalPoliciesRes {
  legalPolicies: Array<{
    createdAt: string;
    createdBy: string;
    isDisabled: boolean;
    merchantId: string;
    policyContent: string;
    policyType: string;
    updatedAt: string;
    updatedBy: string;
  }>;
  message: string;
  status: boolean;
}
