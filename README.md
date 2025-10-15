# Plantilla de Invitación de Boda Elegante

¡Bienvenido! Este es un proyecto de Next.js diseñado para crear una invitación de boda digital, moderna y totalmente personalizable. La plantilla está construida para ser fácil de editar, incluso si no tienes mucha experiencia en programación.

## Características

- **Diseño Moderno y Responsivo:** Se ve increíble en cualquier dispositivo, desde móviles hasta computadoras de escritorio.
- **Altamente Personalizable:** Cambia nombres, fechas, lugares, fotos y más desde un único archivo de configuración.
- **Funcionalidad RSVP Integrada:** Los invitados pueden confirmar su asistencia a través de un formulario funcional conectado a una base de datos segura de Firebase (Firestore).
- **Panel de Administración:** Una página privada para que los novios puedan ver en tiempo real quién ha confirmado, cuántos acompañantes vienen y los mensajes que han dejado.
- **Animaciones Sutiles:** Las secciones aparecen suavemente a medida que el usuario se desplaza.
- **Componentes Interactivos:** Incluye un carrusel de galería, mapas de Google integrados y uso compartido por WhatsApp.

---

## Cómo Empezar

Para poner en marcha el proyecto en tu entorno local, sigue estos pasos:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Crear el archivo de entorno:**
    Copia el contenido de `.env` a un nuevo archivo llamado `.env.local`. Este archivo es donde guardarás tus claves de API secretas.

3.  **Configurar Firebase (¡MUY IMPORTANTE!)**
    Para que el formulario de RSVP y el panel de administración funcionen, necesitas conectar el proyecto a Firebase.
    
    a. **Pide la configuración inicial:** Simplemente dile al asistente: **"configura Firebase para el RSVP"**. El asistente se encargará de crear el proyecto y llenar las siguientes variables en tu archivo `.env.local`:
    
    ```
    # Firebase Service Account Credentials (generadas por el asistente)
    FIREBASE_PROJECT_ID="tu-project-id"
    FIREBASE_CLIENT_EMAIL="tu-client-email"
    FIREBASE_PRIVATE_KEY="tu-private-key"
    
    # Firebase Admin SDK configuration (generadas por el asistente)
    NEXT_PUBLIC_FIREBASE_API_KEY="tu-api-key"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="tu-auth-domain"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="tu-project-id"
    # ... y otras variables de Firebase
    ```

4.  **Añadir la clave de Google Maps:**
    Para que los mapas de la sección "Lugar" funcionen, necesitas una clave de API de Google Maps. Sigue las [instrucciones oficiales](https://developers.google.com/maps/documentation/javascript/get-api-key) para obtener una. Luego, añade la clave a tu archivo `.env.local`:
    ```
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="TU_API_KEY_AQUI"
    ```

5.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver la invitación. Para ver el panel de administración, ve a [http://localhost:9002/admin](http://localhost:9002/admin).

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
  // ESTE CAMPO ES CRÍTICO PARA LA PRIVACIDAD DE LOS DATOS
  slug: "nombre-ella-y-el", // Un identificador único para la boda. No usar espacios ni caracteres especiales.
  weddingDate: "2025-12-05T17:00:00-06:00", // Formato: AAAA-MM-DDTHH:mm:ss con zona horaria
  city: "Ciudad, Estado, País",
  hashtag: "#LosNoviosParaSiempre",
  musicUrl: "URL_DE_TU_CANCION.mp3", // Enlace a un archivo .mp3
  ...
};
```
**Importante:** El `slug` es lo que asegura que los invitados de una boda no se mezclen con los de otra. **Cada boda debe tener un `slug` único.**

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
    shareAndConnect: true,
    gifts: true,
    seeYou: true,
    rsvp: true,
  },
```

### Imágenes y Lugares

Sigue las mismas instrucciones que antes para actualizar lugares, imágenes de la galería, etc.

---

¡Y eso es todo! Con solo editar `site.ts` y configurar Firebase, puedes tener una invitación de boda completamente funcional y personalizada, lista para compartir.
