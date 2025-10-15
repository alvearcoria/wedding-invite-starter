"use server";

import { addDocumentNonBlocking } from "@/firebase";
import { collection, getFirestore } from "firebase/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { RsvpInput, rsvpSchema } from "@/types/rsvp";
import { FieldValue } from "firebase-admin/firestore";


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
    const { slug, ...guestData } = validatedFields.data;
    
    const guestRef = adminDb.collection('invitations').doc(slug).collection('guests').doc();
    
    await guestRef.set({
      ...guestData,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      source: 'website',
    });

    return { success: "¡Gracias por tu confirmación! Estamos ansiosos por verte." };

  } catch (error) {
    console.error("No se pudo procesar el RSVP:", error);
    const errorMessage = error instanceof Error ? error.message : "Hubo un problema al enviar tu RSVP. Por favor, inténtalo de nuevo más tarde.";
    return { error: errorMessage };
  }
}
