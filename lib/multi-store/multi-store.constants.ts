type Store = {
  STORE_ID: string;
  STORE_KIND: "FAKE" | "REAL";
  NEXT_SHOPIFY_ACCESS_TOKEN: string;
  NEXT_SHOPIFY_API_KEY: string;
  NEXT_SHOPIFY_SECRET_KEY: string;
  NEXT_SHOPIFY_STORE_DOMAIN: string;
};

export const STORES: Store[] = [
  {
    STORE_ID: "1",
    STORE_KIND: "FAKE",
    NEXT_SHOPIFY_ACCESS_TOKEN: "",
    NEXT_SHOPIFY_API_KEY: "",
    NEXT_SHOPIFY_SECRET_KEY: "",
    NEXT_SHOPIFY_STORE_DOMAIN: "",
  },
  {
    STORE_ID: "2",
    STORE_KIND: "REAL",
    NEXT_SHOPIFY_ACCESS_TOKEN:
      process.env.NEXT_CHAMPION_STREET_SHOPIFY_ACCESS_TOKEN ?? "",
    NEXT_SHOPIFY_API_KEY:
      process.env.NEXT_CHAMPION_STREET_SHOPIFY_API_KEY ?? "",
    NEXT_SHOPIFY_SECRET_KEY:
      process.env.NEXT_CHAMPION_STREET_SHOPIFY_SECRET_KEY ?? "",
    NEXT_SHOPIFY_STORE_DOMAIN:
      process.env.NEXT_CHAMPION_STREET_SHOPIFY_STORE_DOMAIN ?? "",
  },
];

export function getStore(storeId: string) {
  return STORES.find((store) => store.STORE_ID === storeId) ?? STORES[0];
}
