"use server";

import { RsvpInput, rsvpSchema } from "@/types/rsvp";

export async function submitRsvp(formData: RsvpInput): Promise<{ success: string; error?: never; } | { error: string; success?: never; }> {
  const validatedFields = rsvpSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.error("Falló la validación de RSVP:", validatedFields.error.flatten().fieldErrors);
    return { error: "Datos no válidos. Por favor, revisa el formulario e inténtalo de nuevo." };
  }

  // Honeypot check
  if (formData._hp) {
    console.log("Honeypot field filled, likely spam. Silently succeeding.");
    return { success: "¡Gracias por tu confirmación! Estamos ansiosos por verte." };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rsvp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
    }

    const result = await response.json();
    
    if (result.success) {
        return { success: result.message };
    } else {
        return { error: result.error || 'An unknown error occurred' };
    }

  } catch (error) {
    console.error("No se pudo procesar el RSVP:", error);
    return { error: "Hubo un problema al enviar tu RSVP. Por favor, inténtalo de nuevo más tarde." };
  }
}
