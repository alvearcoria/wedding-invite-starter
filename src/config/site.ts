
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
    hotels: false,
    hashtag: true,
    seeYou: true,
    rsvp: true,
  },

  musicUrl: "https://cdn.pixabay.com/download/audio/2022/02/14/audio_2047376092.mp3", // Enlace directo a un archivo MP3

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
      name: "Parroquia San Juan de los Lagos",
      address: "Mimas 230, Cosmópolis, 66614 Cdad. Apodaca, N.L.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parroquia+San+Juan+de+los+Lagos+Apodaca",
      location: { lat: 25.7755, lng: -100.1873 },
    },
    reception: {
      name: "Salón de eventos Esméralda",
      address: "Av. Andrómeda 102, Cosmópolis, 66614 Cdad. Apodaca, N.L.",
      mapsUrl: "https://maps.app.goo.gl/Fra7CXPxJt6aSV2a6",
      location: { lat: 25.7760, lng: -100.1895 },
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

export type SiteConfig = typeof siteConfig;
