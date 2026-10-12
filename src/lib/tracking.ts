export type LinkLocation = "hero" | "teardown" | "footer";

export type DataLayerEvent =
  | { event: "whatsapp_click" | "email_click" | "linkedin_click"; link_location: LinkLocation }
  | { event: "teardown_submit"; method: "whatsapp" | "email"; ad_spend: string }
  | { event: "self_check_complete"; break_stage: "click" | "reply" | "deal" | "none"; yes_count: number };

export type ContactEvent = Extract<DataLayerEvent, { link_location: LinkLocation }>["event"];

declare global {
  interface Window {
    dataLayer?: Array<DataLayerEvent | Record<string, unknown>>;
  }
}

export function track(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}
