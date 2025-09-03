"use server";

import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters long."),
  guests: z.number().int().min(1).max(5),
  dietary: z.string().optional(),
  message: z.string().max(500, "Message cannot exceed 500 characters.").optional(),
});

export async function submitRsvp(formData: unknown): Promise<{ success: string; error?: never; } | { error: string; success?: never; }> {
  const validatedFields = rsvpSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.error("RSVP validation failed:", validatedFields.error.flatten().fieldErrors);
    return { error: "Invalid data provided. Please check the form and try again." };
  }

  try {
    // In a real application, you would save the data to a database like Firebase here.
    // For this example, we'll just log it to the console.
    console.log("New RSVP Received:", validatedFields.data);

    // Simulate a short delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: "Thank you for your confirmation! We can't wait to see you." };
  } catch (error) {
    console.error("Failed to process RSVP:", error);
    return { error: "There was an issue submitting your RSVP. Please try again later." };
  }
}
