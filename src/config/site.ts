export const siteConfig = {
  couple: {
    her: "Mely",
    him: "Noe",
  },
  weddingDate: "2024-12-14T16:00:00", // YYYY-MM-DDTHH:mm:ss

  // Visibilidad de las secciones
  showCountdown: true,
  showOurStory: true,
  showTimeline: true,
  showVenues: true,
  showGallery: true,
  showGifts: true,
  showRsvp: true,

  // Enlaces de navegación
  navLinks: [
    { name: "Nuestra Historia", href: "#our-story", enabled: true },
    { name: "Itinerario", href: "#timeline", enabled: true },
    { name: "Lugar", href: "#venues", enabled: true },
    { name: "Galería", href: "#gallery", enabled: true },
    { name: "Regalos", href: "#gifts", enabled: true },
  ],

  // Detalles del lugar
  ceremony: {
    name: "Iglesia de Santa María",
    address: "Calle de la Iglesia 123, Villa Votos, VV 45678",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=St.+Mary%27s+Church",
    location: { lat: 40.712776, lng: -74.005974 }, // Ejemplo: Ayuntamiento de Nueva York
  },
  reception: {
    name: "El Gran Salón",
    address: "Avenida Celebración 456, Pueblo Fiesta, PT 87654",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=The+Grand+Hall",
    location: { lat: 40.7580, lng: -73.9855 }, // Ejemplo: Times Square
  },

  // Mesa de regalos y datos bancarios
  giftRegistry: {
    enabled: true,
    url: "https://www.example.com/gift-registry",
  },
  bankDetails: {
    enabled: true,
    accountHolder: "Fondo de Boda M. & N.",
    iban: "ES1234567890123456789012",
  },

  // Galería de fotos
  galleryImages: [
    { src: "https://picsum.photos/id/1015/1200/800", alt: "Una pareja de enamorados abrazándose", dataAiHint: "wedding couple" },
    { src: "https://picsum.photos/id/1027/800/1200", alt: "Primer plano de la pareja sonriendo", dataAiHint: "happy couple" },
    { src: "https://picsum.photos/id/1040/1200/800", alt: "Pareja caminando en la playa", dataAiHint: "couple beach" },
    { src: "https://picsum.photos/id/106/800/1200", alt: "Una hermosa foto de paisaje de la pareja", dataAiHint: "couple landscape" },
    { src: "https://picsum.photos/id/119/1200/800", alt: "Pareja compartiendo una risa", dataAiHint: "couple laughing" },
    { src: "https://picsum.photos/id/129/800/1200", alt: "Pareja mirando una vista", dataAiHint: "couple view" },
  ],
  collaborativeAlbum: {
    enabled: true,
    url: "https://photos.app.goo.gl/example",
  },
};

// Filtrar dinámicamente los enlaces de navegación según la configuración
siteConfig.navLinks = siteConfig.navLinks.filter(link => {
    if (link.href === '#our-story') return siteConfig.showOurStory;
    if (link.href === '#timeline') return siteConfig.showTimeline;
    if (link.href === '#venues') return siteConfig.showVenues;
    if (link.href === '#gallery') return siteConfig.showGallery;
    if (link.href === '#gifts') return siteConfig.showGifts;
    return true;
});


export type SiteConfig = typeof siteConfig;
