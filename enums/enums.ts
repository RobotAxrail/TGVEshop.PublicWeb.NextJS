export const googleMapAPILibraries = ["places"];

export enum OrderModalStateActions {
  ADD_ADDRESS = "open add address",
  EDIT_ADDRESS = "open edit address",
  CLOSE = "close and reset state",
  HOME = "open home",
  OPEN_VALIDATE = "open and validate",
}

export enum StoreTypes {
  WARUNG_STORETYPE = "warung", //Axrail eWarung
  AC_STORETYPE = "singleOnline", //Axrail Commerce
  MULTISTORE_STORETYPE = "multiOffline", // Axrail MultiStore
  B2B_STORETYPE = "b2b", // QL Eggs usage
  WHATSAPP_CRM_STORETYPE = "whatsAppCrm", // WhatsApp CRM
}

export enum OrderTypes {
  DELIVERY = "Delivery",
  PICKUP = "PickUp",
  DINEIN = "DineIn",
}

export const MANUAL_PAYMENT_ORDER_PAYMENT_COMPLETED_STATUS_LIST = Object.freeze(
  [
    "Pending Fulfilled",
    "Order Fulfilled",
    "To Ship",
    "Shipping",
    "Order Completed",
    "Pending Payment",
    "Ready for Customer Pickup",
  ]
);

export enum PaymentStatus {
  SUCCESS_RECEIPT_UPLOADED = "success-receipt-uploaded",
  SUCCESS_PAYMENT_CONFIRMED = "success-payment-confirmed",
  FAILED_PAYMENT_NOT_RECEIVED = "failed-payment-not-received",
  FAILED_PAYMENT_FAILED = "failed-eghl-payment-failed",
  FAILED_ORDER_NOT_FOUND = "failed-order-not-found",
  FAILED_INVALID_ORDER_NUMBER = "failed-invalid-order-number",
  PAY_AT_COUNTER = "pay-at-counter",
}

export enum legalPoliciesType {
  PRIVACY = "Privacy",
  REFUND = "Refund",
  TERMS_OF_SERVICE = "Term Of Service",
  SHIPPING = "Shipping",
}
