# Plantilla de Invitación de Boda Elegante

¡Bienvenido! Este es un proyecto de Next.js diseñado para crear una invitación de boda digital, moderna y totalmente personalizable. La plantilla está construida para ser fácil de editar, incluso si no tienes mucha experiencia en programación.

## Características

- **Diseño Moderno y Responsivo:** Se ve increíble en cualquier dispositivo, desde móviles hasta computadoras de escritorio.
- **Altamente Personalizable:** Cambia nombres, fechas, lugares, fotos y más desde un único archivo de configuración.
- **Animaciones Sutiles:** Las secciones aparecen suavemente a medida que el usuario se desplaza, creando una experiencia de navegación fluida.
- **Componentes Interactivos:** Incluye un carrusel de galería, mapas de Google integrados y un formulario de confirmación de asistencia (RSVP) funcional.
- **Fácil de Desplegar:** Construido con Next.js para un rendimiento óptimo y un despliegue sencillo en plataformas como Vercel o Firebase App Hosting.

---

## Cómo Empezar

Para poner en marcha el proyecto en tu entorno local, sigue estos pasos:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Crear el archivo de entorno:**
    Copia el contenido de `.env` a un nuevo archivo llamado `.env.local`. Este archivo es donde guardarás tus claves de API secretas.

3.  **Añadir la clave de Google Maps:**
    Para que los mapas de la sección "Lugar" funcionen, necesitas una clave de API de Google Maps. Sigue las [instrucciones oficiales](https://developers.google.com/maps/documentation/javascript/get-api-key) para obtener una. Luego, añade la clave a tu archivo `.env.local`:
    ```
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=TU_API_KEY_AQUI
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver el resultado.

---

## ✨ Personaliza Tu Invitación

¡Esta es la parte más importante! Para personalizar la invitación con los detalles de tu boda, solo necesitas editar un archivo:

**`/src/config/site.ts`**

Abre este archivo y modifica los valores según tus necesidades. A continuación se detalla cada sección:

### Información Principal

```typescript
export const siteConfig = {
  couple: {
    her: "Nombre de Ella",
    him: "Nombre de Él",
  },
  slug: "nombre-ella-y-el", // Un identificador único para el formulario
  weddingDate: "2025-12-05T17:00:00-06:00", // Formato: AAAA-MM-DDTHH:mm:ss con zona horaria
  city: "Ciudad, Estado, País",
  hashtag: "#LosNoviosParaSiempre",
  musicUrl: "URL_DE_TU_CANCION.mp3", // Enlace a un archivo .mp3
  ...
};
```

### Secciones Visibles

Puedes activar o desactivar secciones completas cambiando `true` a `false`.

```typescript
  sections: {
    music: true,
    story: true,
    timeline: true,
    dressCode: true,
    venues: true,
    gallery: true,
    qrAlbum: true,
    gifts: true,
    hashtag: true,
    seeYou: true,
    rsvp: true,
  },
```

### Lugares (Ceremonia y Recepción)

Actualiza los detalles de los lugares. Para obtener las coordenadas `lat` y `lng`, puedes usar Google Maps (haz clic derecho en un punto del mapa para verlas).

```typescript
  venues: {
    ceremony: {
      name: "Nombre de la Iglesia",
      address: "Dirección completa de la ceremonia",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=...",
      location: { lat: 25.72, lng: -100.31 }, // Latitud y Longitud
    },
    ...
  },
```

### Imágenes

1.  **Agrega tus imágenes:** Coloca tus fotos dentro de la carpeta `/public/images/`.
2.  **Actualiza las rutas:** Cambia las rutas en el archivo de configuración para que apunten a tus nuevas imágenes.

**Recomendaciones de tamaño:**
- **Hero y Saludo Final:** Fotos horizontales (panorámicas).
- **Nuestra Historia:** Foto horizontal (proporción 4:3).
- **Galería:** Fotos verticales (proporción 3:4) para un mejor efecto en el carrusel.

```typescript
  // Galería de fotos
  galleryImages: [
    { src: "/images/gallery-1.jpg", alt: "Descripción de la foto 1", dataAiHint: "wedding couple" },
    { src: "/images/gallery-2.jpg", alt: "Descripción de la foto 2", dataAiHint: "happy couple" },
    ...
  ],
```

### Regalos

Puedes elegir entre `bank` (transferencia bancaria) o `list` (mesa de regalos).

```typescript
  gifts: {
    mode: "bank", // 'bank' o 'list'
    bankLabel: "CLABE Interbancaria",
    bankValueMasked: "1234 **** **** 5678",
    bankValueFull: "123456789012345678", // El número completo para copiar
    giftListUrl: "https://www.amazon.com/wedding/registry/...",
  },
```

---

¡Y eso es todo! Con solo editar este archivo, puedes tener una invitación de boda completamente personalizada y lista para compartir.
