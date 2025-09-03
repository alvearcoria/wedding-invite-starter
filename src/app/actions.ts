"use server";

import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().min(2, "El nombre completo debe tener al menos 2 caracteres."),
  guests: z.number().int().min(1).max(5),
  dietary: z.string().optional(),
  message: z.string().max(500, "El mensaje no puede exceder los 500 caracteres.").optional(),
});

export async function submitRsvp(formData: unknown): Promise<{ success: string; error?: never; } | { error: string; success?: never; }> {
  const validatedFields = rsvpSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.error("Falló la validación de RSVP:", validatedFields.error.flatten().fieldErrors);
    return { error: "Datos no válidos. Por favor, revisa el formulario e inténtalo de nuevo." };
  }

  try {
    // En una aplicación real, guardarías los datos en una base de datos como Firebase aquí.
    // Para este ejemplo, solo lo registraremos en la consola.
    console.log("Nuevo RSVP Recibido:", validatedFields.data);

    // Simular un breve retraso
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: "¡Gracias por tu confirmación! Estamos ansiosos por verte." };
  } catch (error) {
    console.error("No se pudo procesar el RSVP:", error);
    return { error: "Hubo un problema al enviar tu RSVP. Por favor, inténtalo de nuevo más tarde." };
  }
}
