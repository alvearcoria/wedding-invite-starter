
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
    description: "Formal. Estaremos en otoño, por ello te dejamos algunas ideas de colores que van con la época del año.",
    note: "Evitar el blanco y todos sus tonos similares (beige, marfil, hueso, crema, etc.), reservados para la novia.",
    imageUrl: "https://pin.it/6CpwooEjD",
    imageButtonLabel: "Clic para mas ideas",
    womanImage: {
      src: "https://ik.imagekit.io/alvearcoria92/VestimentaMujer.png?updatedAt=1760480501865",
      alt: "Vestimenta sugerida para mujeres"
    },
    manImage: {
      src: "https://ik.imagekit.io/alvearcoria92/Vestimenta.png?updatedAt=1758303855176",
      alt: "Vestimenta sugerida para hombres"
    }
  },

  timelineEvents: [
    { time: "4:30 PM", event: "Ceremonia", description: "Sean testigos de nuestros votos y el comienzo de nuestro para siempre.", icon: "Church" },
    { time: "8:00 PM", event: "Recepción", description: "Disfruten de la bienvenida.", icon: "Bell" },
    { time: "8:30 PM", event: "Primer Baile", description: "Nuestro primer baile como esposos.", icon: "HeartHandshake" },
    { time: "9:00 PM", event: "Cena", description: "Acompáñennos para una deliciosa cena.", icon: "Utensils" },    
    { time: "10:00 PM", event: "¡Fiesta!", description: "¡Vamos a la pista de baile!", icon: "Music" },
    { time: "12:30 AM", event: "Tornaboda", description: "Continuemos la celebración.", icon: "Coffee" },
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

  share: {
    whatsappMessage: "¡Estás invitado a nuestra boda! Acompáñanos a celebrar el día más importante de nuestras vidas. Encuentra todos los detalles aquí:",
  },

  galleryImages: [
    { "src": "https://picsum.photos/seed/g1/800/1200", "alt": "Una pareja de enamorados abrazándose", "dataAiHint": "wedding couple" },
    { "src": "https://picsum.photos/seed/g2/800/1200", "alt": "Primer plano de la pareja sonriendo", "dataAiHint": "happy couple" },
    { "src": "https://picsum.photos/seed/g3/800/1200", "alt": "Pareja caminando en la playa", "dataAiHint": "couple beach" },
    { "src": "https://picsum.photos/seed/g4/800/1200", "alt": "Una hermosa foto de paisaje de la pareja", "dataAiHint": "couple landscape" },
    { "src": "https://picsum.photos/seed/g5/800/1200", "alt": "Pareja compartiendo una risa", "dataAiHint": "couple laughing" },
    { "src": "https://picsum.photos/seed/g6/800/1200", "alt": "Pareja mirando una vista", "dataAiHint": "couple view" }
  ],
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
