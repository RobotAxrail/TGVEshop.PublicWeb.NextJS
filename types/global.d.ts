export {};

declare global {
  interface Window {
    dataLayer: Array<{ event: string }>;
  }
}
