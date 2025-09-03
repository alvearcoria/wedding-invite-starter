import { z } from 'zod';

export const rsvpSchema = z.object({
  name: z.string().min(2, 'El nombre completo debe tener al menos 2 caracteres.'),
  email: z.string().email('Por favor, ingresa un correo electrónico válido.').optional().or(z.literal('')),
  phone: z.string().optional(),
  attending: z.boolean({ required_error: 'Por favor, selecciona si asistirás.' }),
  companions: z.number().int().min(0).max(10),
  diet: z.string().optional(),
  message: z.string().max(500, 'El mensaje no puede exceder los 500 caracteres.').optional(),
  slug: z.string(),
  _hp: z.string().optional(), // Honeypot field
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
