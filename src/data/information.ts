export const information = {
  contact: { title: "Contact", intro: "Stay close to the collective.", sections: [
    { heading: "A conversation starts here.", body: "Official contact details will be published before the first release. This local preview does not send messages or collect enquiries." },
    { heading: "Instagram", id: "instagram", body: "Our verified Instagram profile will be linked here once the official account is confirmed. No social handle has been assumed for this preview." },
  ] },
  shipping: { title: "Shipping", intro: "Delivery information for the first release.", sections: [
    { heading: "Before orders open", body: "Shipping destinations, delivery estimates and rates are still to be confirmed. They will be published here and made available before checkout when the collection launches." },
    { heading: "Collection preview", body: "The pieces currently shown are design concepts. No stock is offered for sale and this preview does not accept orders." },
  ] },
  returns: { title: "Returns", intro: "Return information for the first release.", sections: [
    { heading: "A considered purchase", body: "Return and exchange procedures will be published before purchases become available. No return window, conditions or shipping charges have been set in this preview." },
    { heading: "Not yet taking orders", body: "This website currently demonstrates the collection and shopping experience. No payments or orders are created through the preview bag." },
  ] },
  privacy: { title: "Privacy", intro: "How this local storefront preview handles your information.", sections: [
    { heading: "Your preview bag", body: "Your selected pieces, colours, sizes and quantities are stored in this browser's local storage so the bag can remain between visits. Clear your browser's site data to remove that stored bag. No customer or payment details are stored in the preview bag." },
    { heading: "Newsletter preview", body: "The newsletter form validates an email address and consent checkbox in your browser. It does not transmit, save or subscribe your email. A confirmed privacy notice and subscription service are required before sign-up opens." },
    { heading: "Account access", body: "Account sign-in is unavailable until the hosted authentication service is configured. If configured by the site owner, credentials are submitted to that authentication service. A complete launch privacy policy, including business contact details and service disclosures, will be published before public launch." },
  ] },
} as const;
export type InformationSlug = keyof typeof information;
