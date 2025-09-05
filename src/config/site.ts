export const siteConfig = {
  couple: {
    her: "Mely",
    him: "Noe",
  },
  slug: "mely-y-noe",
  weddingDate: "2025-11-29T17:00:00-06:00", // YYYY-MM-DDTHH:mm:ss con TZ
  city: "Apodaca, N.L., México",
  hashtag: "#MelyYNoeParaSiempre",

  // Visibilidad de las secciones
  sections: {
    music: true,
    story: true,
    timeline: true,
    dressCode: true,
    venues: true,
    gallery: true,
    qrAlbum: true,
    gifts: true,
    hotels: true,
    hashtag: true,
    seeYou: true,
    rsvp: true,
  },

  musicUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder

  // Enlaces de navegación (se filtran automáticamente abajo)
  navLinks: [
    { name: "Nuestra Historia", href: "#our-story" },
    { name: "Itinerario", href: "#timeline" },
    { name: "Vestimenta", href: "#dress-code"},
    { name: "Lugar", href: "#venues" },
    { name: "Galería", href: "#gallery" },
    { name: "Regalos", href: "#gifts" },
    { name: "Hospedaje", href: "#hotels"},
  ],

  // Detalles del lugar
  venues: {
    ceremony: {
      name: "Iglesia de Santa María",
      address: "Calle de la Iglesia 123, Villa Votos, VV 45678",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=St.+Mary%27s+Church",
      location: { lat: 40.712776, lng: -74.005974 }, // Ejemplo: Ayuntamiento de Nueva York
    },
    reception: {
      name: "El Gran Salón",
      address: "Avenida Celebración 456, Pueblo Fiesta, PT 87654",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Hall",
      location: { lat: 40.7580, lng: -73.9855 }, // Ejemplo: Times Square
    },
  },
  
  dressCode: {
    title: "Código de Vestimenta",
    description: "Para que te sientas cómodo y te veas increíble, aquí te dejamos una guía.",
    note: "Formal. Evitar blanco. Gracias 💛"
  },

  // Mesa de regalos y datos bancarios
  gifts: {
    mode: "bank", // 'bank' or 'list'
    bankLabel: "CLABE Interbancaria",
    bankValueMasked: "1234 **** **** 5678",
    bankValueFull: "123456789012345678",
    giftListUrl: "https://www.example.com/gift-registry",
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
  qrAlbum: {
    url: "https://photos.app.goo.gl/example",
  },

  // Hospedaje
  hotels: [
    { name: "Hotel Cercano", distance: "5 min del lugar", tel: "81-1234-5678", mapsUrl: "https://goo.gl/maps/example1" },
    { name: "Hotel Opción B", distance: "10 min del lugar", tel: "81-8765-4321", mapsUrl: "https://goo.gl/maps/example2" },
    { name: "Airbnb's Sugeridos", distance: "Varía", tel: "N/A", mapsUrl: "https://www.airbnb.mx/" },
  ]
};

// This filtering logic is no longer needed as the header is removed.
// siteConfig.navLinks = siteConfig.navLinks.filter(link => {
//     if (link.href === '#our-story') return siteConfig.sections.story;
//     if (link.href === '#timeline') return siteConfig.sections.timeline;
//     if (link.href === '#dress-code') return siteConfig.sections.dressCode;
//     if (link.href === '#venues') return siteConfig.sections.venues;
//     if (link.href === '#gallery') return siteConfig.sections.gallery;
//     if (link.href === '#gifts') return siteConfig.sections.gifts;
//     if (link.href === '#hotels') return siteConfig.sections.hotels;
//     return true;
// });


export type SiteConfig = typeof siteConfig;
