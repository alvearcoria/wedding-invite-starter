export const siteConfig = {
  couple: {
    her: "Mely",
    him: "Noe",
  },
  weddingDate: "2024-12-14T16:00:00", // YYYY-MM-DDTHH:mm:ss

  // Section visibility
  showCountdown: true,
  showOurStory: true,
  showTimeline: true,
  showVenues: true,
  showGallery: true,
  showGifts: true,
  showRsvp: true,

  // Navigation links
  navLinks: [
    { name: "Our Story", href: "#our-story", enabled: true },
    { name: "Timeline", href: "#timeline", enabled: true },
    { name: "Venues", href: "#venues", enabled: true },
    { name: "Gallery", href: "#gallery", enabled: true },
    { name: "Gifts", href: "#gifts", enabled: true },
  ],

  // Venue Details
  ceremony: {
    name: "St. Mary's Church",
    address: "123 Church St, Vows Ville, VV 45678",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=St.+Mary%27s+Church",
    location: { lat: 40.712776, lng: -74.005974 }, // Example: NYC City Hall
  },
  reception: {
    name: "The Grand Hall",
    address: "456 Celebration Ave, Party Town, PT 87654",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=The+Grand+Hall",
    location: { lat: 40.7580, lng: -73.9855 }, // Example: Times Square
  },

  // Gift Registry & Bank Details
  giftRegistry: {
    enabled: true,
    url: "https://www.example.com/gift-registry",
  },
  bankDetails: {
    enabled: true,
    accountHolder: "M. & N. Wedding Fund",
    iban: "ES1234567890123456789012",
  },

  // Photo Gallery
  galleryImages: [
    { src: "https://picsum.photos/id/1015/1200/800", alt: "A loving couple embracing", dataAiHint: "wedding couple" },
    { src: "https://picsum.photos/id/1027/800/1200", alt: "Close up of the couple smiling", dataAiHint: "happy couple" },
    { src: "https://picsum.photos/id/1040/1200/800", alt: "Couple walking on a beach", dataAiHint: "couple beach" },
    { src: "https://picsum.photos/id/106/800/1200", alt: "A beautiful landscape shot of the couple", dataAiHint: "couple landscape" },
    { src: "https://picsum.photos/id/119/1200/800", alt: "Couple sharing a laugh", dataAiHint: "couple laughing" },
    { src: "https://picsum.photos/id/129/800/1200", alt: "Couple looking out at a view", dataAiHint: "couple view" },
  ],
  collaborativeAlbum: {
    enabled: true,
    url: "https://photos.app.goo.gl/example",
  },
};

// Dynamically filter nav links based on config
siteConfig.navLinks = siteConfig.navLinks.filter(link => {
    if (link.href === '#our-story') return siteConfig.showOurStory;
    if (link.href === '#timeline') return siteConfig.showTimeline;
    if (link.href === '#venues') return siteConfig.showVenues;
    if (link.href === '#gallery') return siteConfig.showGallery;
    if (link.href === '#gifts') return siteConfig.showGifts;
    return true;
});


export type SiteConfig = typeof siteConfig;
