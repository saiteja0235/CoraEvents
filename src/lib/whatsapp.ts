export const whatsappPhone = '918309031419';
export const defaultWhatsAppMessage = "Hello! I'm planning a special event and would love to discuss my requirements.";

export function getWhatsAppUrl(message = defaultWhatsAppMessage) {
  const encodedMessage = encodeURIComponent(message);
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return isMobile
    ? `whatsapp://send?phone=${whatsappPhone}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${encodedMessage}`;
}
