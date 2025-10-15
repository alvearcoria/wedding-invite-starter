import { z } from 'zod';

export const rsvpSchema = z.object({
  name: z.string().min(2, 'El nombre completo debe tener al menos 2 caracteres.'),
  phone: z.string().optional(),
  attending: z.boolean({ required_error: 'Por favor, selecciona si asistirás.' }),
  companions: z.number().int().min(0).max(10),
  message: z.string().max(500, 'El mensaje no puede exceder los 500 caracteres.').optional(),
  slug: z.string(),
  _hp: z.string().optional(), // Honeypot field
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
