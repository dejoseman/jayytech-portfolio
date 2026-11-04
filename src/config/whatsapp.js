/**
 * WhatsApp contact — single source of truth for the number, message and link.
 * Uses the official wa.me deep link, which opens the WhatsApp app on mobile
 * and WhatsApp Web / Desktop on larger screens.
 */
const env = import.meta.env;

export const WHATSAPP_NUMBER = (env.VITE_WHATSAPP_NUMBER || "2349068901749").replace(/\D/g, "");
export const WHATSAPP_DISPLAY = "+234 906 890 1749";
export const WHATSAPP_MESSAGE =
    "Hello Okechukwu, I visited your portfolio and would like to discuss a potential project or opportunity with you.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Shared attributes for every WhatsApp link (new tab, no opener/referrer leakage)
export const whatsappLinkProps = {
    href: WHATSAPP_URL,
    target: "_blank",
    rel: "noopener noreferrer",
};
