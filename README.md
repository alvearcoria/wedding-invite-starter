# Invitación de Boda Digital y Personalizable

¡Bienvenido! Este es un proyecto de Next.js diseñado para crear una invitación de boda digital, moderna y totalmente personalizable. La plantilla ha sido mejorada para incluir funcionalidades interactivas avanzadas, manteniendo la facilidad de edición.

## ✨ Características Principales

- **Diseño Moderno y Adaptable:** Se ve increíble en cualquier dispositivo, desde móviles hasta computadoras de escritorio.
- **Altamente Personalizable:** Cambia nombres, fechas, lugares, fotos y más desde un único archivo de configuración (`/src/config/site.ts`).
- **Formulario RSVP Inteligente:** Los invitados pueden confirmar su asistencia a través de un formulario dinámico que se ajusta según la respuesta del invitado.
- **Panel de Administración:** Una página privada (`/admin`) para que los novios puedan ver en tiempo real quién ha confirmado, cuántos acompañantes vienen y los mensajes que han dejado. Incluye estadísticas y la opción de exportar a CSV.
- **Álbum de Fotos Colaborativo:** Una página dedicada (`/guest-album`) donde los invitados pueden subir sus propias fotos de la boda, creando un recuerdo compartido.
- **Componentes Interactivos:** Incluye un carrusel de galería, mapas de Google integrados y un código QR funcional para compartir el álbum.
- **Animaciones Sutiles:** Las secciones aparecen suavemente a medida que el usuario se desplaza, mejorando la experiencia visual.

---

## 🚀 Cómo Empezar

Para poner en marcha el proyecto en tu entorno local, sigue estos pasos:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Crear el archivo de entorno:**
    Copia el contenido de `.env` a un nuevo archivo llamado `.env.local`. Este archivo es donde guardarás tus claves de API secretas.

3.  **Configurar Firebase (¡MUY IMPORTANTE!)**
    Para que el formulario de RSVP, el álbum de invitados y el panel de administración funcionen, necesitas conectar el proyecto a Firebase.
    
    a. **Pide la configuración inicial:** Simplemente dile al asistente: **"configura Firebase"**. El asistente se encargará de crear el proyecto y llenar las siguientes variables en tu archivo `.env.local`:
    
    ```
    # Credenciales de Firebase generadas por el asistente
    FIREBASE_PROJECT_ID="tu-project-id"
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

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver la invitación.
-   Para ver el panel de administración, ve a [http://localhost:9002/admin](http://localhost:9002/admin).
-   Para ver el álbum de invitados, ve a [http://localhost:9002/guest-album](http://localhost:9002/guest-album).

---

## 🎨 Personaliza Tu Invitación

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
  slug: "nombre-ella-y-el", // Un identificador único para la boda.
  weddingDate: "2025-12-05T17:00:00-06:00", // Formato ISO 8601
  city: "Ciudad, Estado, País",
  hashtag: "#LosNoviosParaSiempre",
  // ...
};
```
**Importante:** El `slug` asegura que los datos de tu boda (invitados, fotos) estén separados de otros. **Cada boda debe tener un `slug` único.**

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
    // ...
  },
```

### Imágenes y Lugares

Edita las URLs de las imágenes y las direcciones de los lugares directamente en este archivo. Para el álbum colaborativo, el código QR en la sección "Comparte y Conecta" enlazará automáticamente a `/guest-album`.

---

¡Y eso es todo! Con solo editar `site.ts` y configurar Firebase, tienes una invitación de boda completamente funcional y personalizada, lista para compartir.
