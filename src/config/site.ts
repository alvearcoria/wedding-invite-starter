
import type { IconName } from "@/components/icons";
import imageData from "@/lib/placeholder-images.json";

// Helper function to safely get the site URL
const getSiteUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Fallback for server-side rendering
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback for local development
  return "http://localhost:9002";
};


export const siteConfig = {
  title: "Mely & Noe: Por siempre",
  description: "Únete a nosotros para la celebración de la boda de Mely y Noe.",
  siteUrl: getSiteUrl(),

  couple: {
    her: "Mely",
    him: "Noe",
  },
  slug: "mely-y-noe",
  weddingDate: "2025-11-29T17:00:00-06:00", // YYYY-MM-DDTHH:mm:ss con TZ
  city: "Apodaca, N.L., México",
  hashtag: "#MelyYNoeParaSiempre",
  
  // Contraseña para el panel de administración
  adminPassword: "BodaMelyYNoe2025!",

  heroIcon: 'flower' as IconName,

  sections: {
    music: true,
    story: true,
    timeline: true,
    dressCode: true,
    venues: true,
    gallery: true,
    shareAndConnect: true,
    gifts: true,
    adultsOnly: true,
    rsvp: true,
    share: true,
    seeYou: true,
  },

  musicUrl: "/audio/wedding-song.mp3",

  navLinks: [
    { name: "Nuestra Historia", href: "#our-story" },
    { name: "Itinerario", href: "#timeline" },
    { name: "Vestimenta", href: "#dress-code"},
    { name: "Lugar", href: "#venues" },
    { name: "Galería", href: "#gallery" },
    { name: "Regalos", href: "#gifts" },
  ],
  
  story: {
    intro_title: "Con la bendición de Dios y de nuestros padres",
    intro_line1: "Cuando nos conocimos, entendimos que nos uniría algo más fuerte que el tiempo y la distancia.",
    intro_line2: "Hoy damos gracias a Dios por habernos hecho coincidir en el camino y empezar una vida juntos.",
    parents: {
      her: {
        title_main: "Padres",
        title_secondary: "de la novia:",
        father: "Raul Sánchez Torres",
        mother: "Francisca Alvear Acosta",
      },
      him: {
        title_main: "Mamá",
        title_secondary: "del novio:",
        mother: "Lourdes Aracely Fernández Galindo",
        father: null,
      }
    },
    outro_line1: "Tenemos el honor de invitarlos a la celebración de nuestro matrimonio.",
    outro_line2: "Esperamos contar con su presencia.",
  },

  heroImage: imageData.heroImage,
  seeYouImage: {
    ...imageData.seeYouImage,
    src: "https://ik.imagekit.io/alvearcoria92/Album/Fotografia%2011.JPG?updatedAt=1760477015159",
  },

  venues: {
    ceremony: {
      name: "Parroquia San Judas Tadeo",
      address: "Mimas 230, Cosmópolis, 66614 Cdad. Apodaca, N.L.",
      mapsUrl: "https://maps.app.goo.gl/qauGCHY6QL5kMeHGA",
      location: { lat: 25.81718855435814, lng: -100.24636189477839 },
      imageSrc: "https://ik.imagekit.io/alvearcoria92/parroquia.jpg?updatedAt=1760727887523",
    },
    reception: {
      name: "Hacienda Paraiso Eventos",
      address: "Robles 510, 65556 Villas Campestres, N.L.",
      mapsUrl: "https://maps.app.goo.gl/XyZt56fVLM47wu5a9",
      location: { lat: 25.917908636423558, lng: -100.22116388503963 },
      imageSrc: "https://ik.imagekit.io/alvearcoria92/hacienda.jpg?updatedAt=1760727887406",
    },
  },
  
  dressCode: {
    title: "Código de Vestimenta",
    description: "Formal. Estaremos en otoño, por ello te dejamos algunas ideas de colores que van con la época del año.",
    note: "Evitar el blanco y todos sus tonos similares (beige, marfil, hueso, crema, etc.), reservados para la novia.",
    imageUrl: "https://pin.it/6CpwooEjD",
    imageButtonLabel: "Clic para mas ideas",
    womanImage: {
      src: "https://ik.imagekit.io/alvearcoria92/VestimentaMujer.png?updatedAt=1760485105414",
      alt: "Vestimenta sugerida para mujeres"
    },
    manImage: {
      src: "https://ik.imagekit.io/alvearcoria92/Vestimenta.png?updatedAt=1758303855176",
      alt: "Vestimenta sugerida para hombres"
    }
  },

  timelineEvents: [
    { time: "4:30 PM", event: "Ceremonia", description: "Sean testigos de nuestros votos y el comienzo de nuestro para siempre.", icon: "church" },
    { time: "8:00 PM", event: "Recepción", description: "Disfruten de la bienvenida.", icon: "bell" },
    { time: "8:30 PM", event: "Primer Baile", description: "Nuestro primer baile como esposos.", icon: "heart-handshake" },
    { time: "9:00 PM", event: "Cena", description: "Acompáñennos para una deliciosa cena.", icon: "utensils" },    
    { time: "10:00 PM", event: "¡Fiesta!", description: "¡Vamos a la pista de baile!", icon: "music" },
  ],

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

  adultsOnly: {
    title: "Evento Sólo para Adultos",
    description: "Aunque adoramos a los pequeños, esta será una celebración pensada especialmente para disfrutar entre adultos. ¡Gracias por comprender y acompañarnos en este día tan especial!",
  },
  
  share: {
    whatsappMessage: "¡Estás invitado a nuestra boda! Acompáñanos a celebrar el día más importante de nuestras vidas. Encuentra todos los detalles aquí:",
  },

  galleryImages: imageData.galleryImages,
  
  qrAlbum: {
    url: `${getSiteUrl()}/guest-album`,
  },
};

export type SiteConfig = typeof siteConfig;
