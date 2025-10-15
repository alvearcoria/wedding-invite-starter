"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { rsvpSchema, type RsvpInput } from "@/types/rsvp";
import confetti from "canvas-confetti";
import { useAuth, useFirestore } from "@/firebase/provider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { signInAnonymously } from "firebase/auth";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { siteConfig } from "@/config/site";

export function RsvpForm() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();

  const form = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      phone: "",
      attending: undefined,
      companions: 0,
      message: "",
      slug: siteConfig.slug,
      _hp: "",
    },
  });

  const onSubmit = async (data: RsvpInput) => {
    // Honeypot check
    if (data._hp) {
      console.log("Honeypot field filled, likely spam. Silently succeeding.");
       toast({
        title: "¡Confirmación Recibida!",
        description: "¡Gracias por tu confirmación! Estamos ansiosos por verte.",
      });
      return;
    }
    
    if (!firestore || !auth) {
       toast({
        variant: "destructive",
        title: "¡Oh no! Algo salió mal.",
        description: "No se pudo conectar a la base de datos. Por favor, inténtalo de nuevo más tarde.",
      });
      return;
    }

    try {
      // Ensure user is signed in anonymously
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }

      const { slug, _hp, ...guestData } = data;
      const guestsCollection = collection(firestore, 'invitations', slug, 'guests');
      
      addDoc(guestsCollection, {
        ...guestData,
        createdAt: serverTimestamp(),
        source: 'website-client',
      }).catch(serverError => {
        // Create and emit a contextual error for security rule violations.
        const contextualError = new FirestorePermissionError({
          path: guestsCollection.path,
          operation: 'create',
          requestResourceData: guestData,
        });
        errorEmitter.emit('permission-error', contextualError);
        
        // Throw the error to be caught by the outer try/catch and displayed
        throw contextualError;
      });

      toast({
        title: "¡Confirmación Recibida!",
        description: "¡Gracias por tu confirmación! Estamos ansiosos por verte.",
      });

      if (data.attending) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      form.reset();

    } catch (error) {
       console.error("Error in RSVP form:", error);
       toast({
        variant: "destructive",
        title: "¡Oh no! Algo salió mal.",
        description: error instanceof Error ? error.message : "Hubo un problema al enviar tu RSVP. Por favor, inténtalo de nuevo más tarde.",
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
              <FormLabel>Nombre Completo*</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="8112345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attending"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>¿Nos acompañarás?*</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === "true")}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Sí, ¡ahí estaré!
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No podré asistir, pero los recordaré.
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acompañantes*</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el número de acompañantes" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} {num === 1 ? "acompañante" : "acompañantes"}
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
        {/* Honeypot field */}
        <FormField
          control={form.control}
          name="_hp"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
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
