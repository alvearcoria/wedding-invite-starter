"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { submitRsvp } from "@/app/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const rsvpFormSchema = z.object({
  name: z.string().min(2, { message: "Por favor, ingresa tu nombre completo." }),
  guests: z.coerce.number().min(1, { message: "Por favor, selecciona el número de invitados." }).max(5),
  dietary: z.string().optional(),
  message: z.string().optional(),
});

type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

export function RsvpForm() {
  const { toast } = useToast();
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: "",
      guests: 1,
      dietary: "",
      message: "",
    },
  });

  const onSubmit = async (data: RsvpFormValues) => {
    const result = await submitRsvp(data);
    if (result.success) {
      toast({
        title: "¡Confirmación Recibida!",
        description: result.success,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "¡Oh no! Algo salió mal.",
        description: result.error,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Invitados</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el número de invitados" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} {num > 1 ? "invitados" : "invitado"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dietary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restricciones Alimenticias</FormLabel>
              <FormControl>
                <Input placeholder="Ej: vegetariano, sin gluten" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deja un Mensaje (Opcional)</FormLabel>
              <FormControl>
                <Textarea placeholder="¡Estamos muy emocionados de celebrar con ustedes!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Enviando..." : "Enviar Confirmación"}
        </Button>
      </form>
    </Form>
  );
}
