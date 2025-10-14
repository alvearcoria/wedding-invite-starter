
import type { IconName } from "@/components/icons";
import imageData from "@/lib/placeholder-images.json";

export const siteConfig = {
  title: "Mely & Noe: Por siempre",
  description: "Únete a nosotros para la celebración de la boda de Mely y Noe.",
  siteUrl: "https://example.com", // Reemplazar con la URL final del sitio

  couple: {
    her: "Mely",
    him: "Noe",
  },
  slug: "mely-y-noe",
  weddingDate: "2025-11-29T17:00:00-06:00", // YYYY-MM-DDTHH:mm:ss con TZ
  city: "Apodaca, N.L., México",
  hashtag: "#MelyYNoeParaSiempre",

  heroIcon: 'heart' as IconName,

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
    share: true,
    hashtag: true,
    seeYou: true,
    rsvp: true,
  },

  musicUrl: "/audio/wedding-song.mp3",

  navLinks: [
    { name: "Nuestra Historia", href: "#our-story" },
    { name: "Itinerario", href: "#timeline" },
    { name: "Vestimenta", href: "#dress-code"},
    { name: "Lugar", href: "#venues" },
    { name: "Galería", href: "#gallery" },
    { name: "Regalos", href: "#gifts" },
    { name: "Hospaje", href: "#hotels"},
  ],
  
  story: {
    intro_title: "Pensamiento o poema",
    intro_line1: "Cuando nos conocimos, entendimos que nos uniría algo más fuerte que el tiempo y la distancia.",
    intro_line2: "Hoy damos gracias a Dios por habernos hecho coincidir en el camino y empezar una vida juntos.",
    parents: {
      title: "Nombres de los papás de ambos",
      her: {
        title_main: "Padres de la novia",
        title_secondary: "de la novia:",
        father: "Raul Sánchez Torres",
        mother: "Francisca Alvear Acosta",
      },
      him: {
        title_main: "Mamá del novio",
        title_secondary: "del novio:",
        mother: "Lourdes Aracely Fernández Galindo",
        father: null,
      }
    },
    outro_line1: "Tenemos el honor de invitarlos a la celebración de nuestro matrimonio.",
    outro_line2: "Esperamos contar con su presencia.",
  },

  heroImage: imageData.heroImage,
  seeYouImage: imageData.seeYouImage,

  venues: {
    ceremony: {
      name: "Parroquia San Judas Tadeo",
      address: "Mimas 230, Cosmópolis, 66614 Cdad. Apodaca, N.L.",
      mapsUrl: "https://maps.app.goo.gl/qauGCHY6QL5kMeHGA",
      location: { lat: 25.81718855435814, lng: -100.24636189477839 },
    },
    reception: {
      name: "Hacienda Paraiso Eventos",
      address: "Robles 510, 65556 Villas Campestres, N.L.",
      mapsUrl: "https://maps.app.goo.gl/XyZt56fVLM47wu5a9",
      location: { lat: 25.917908636423558, lng: -100.22116388503963 },
    },
  },
  
  dressCode: {
    title: "Código de Vestimenta",
    description: "Para que te sientas cómodo y te veas increíble, aquí te dejamos una guía.",
    note: "Formal. Evitar blanco. Gracias 💛"
  },

  gifts: {
    title: "Regalos",
    intro: "Agradecemos mucho todo su amor y apoyo al iniciar esta etapa de formar nuestro hogar.",
    modes: ["envelope"],
    envelope: {
      title: "¡Lluvia de Sobres!",
      description: "La lluvia de sobres, es la tradición de regalar dinero en efectivo a los novios en un sobre el día del evento.",
    },
    bank: {
      label: "CLABE Interbancaria",
      valueMasked: "1234 **** **** 5678",
      valueFull: "123456789012345678",
    },
    giftListUrl: "https://www.example.com/gift-registry",
  },

  share: {
    whatsappMessage: "¡Estás invitado a nuestra boda! Acompáñanos a celebrar el día más importante de nuestras vidas. Encuentra todos los detalles aquí:",
  },

  galleryImages: imageData.galleryImages,
  qrAlbum: {
    url: "https://photos.app.goo.gl/example",
  },

  hotels: [
    { name: "Hotel Cercano", distance: "5 min del lugar", tel: "81-1234-5678", mapsUrl: "https://goo.gl/maps/example1" },
    { name: "Hotel Opción B", distance: "10 min del lugar", tel: "81-8765-4321", mapsUrl: "https://goo.gl/maps/example2" },
    { name: "Airbnb's Sugeridos", distance: "Varía", tel: "N/A", mapsUrl: "https://www.airbnb.mx/" },
  ]
};

export type SiteConfig = typeof siteConfig;
