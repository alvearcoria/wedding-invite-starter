
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { rsvpSchema, type RsvpInput } from "@/types/rsvp";
import confetti from "canvas-confetti";
import { useFirestore } from "@/firebase/provider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

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
import { useEffect } from "react";

export function RsvpForm() {
  const { toast } = useToast();
  const firestore = useFirestore();

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

  const attendingValue = form.watch("attending");

  useEffect(() => {
    if (attendingValue === false) {
      form.setValue("companions", 0);
    }
  }, [attendingValue, form]);

  const onSubmit = (data: RsvpInput) => {
    // Honeypot check for spam prevention
    if (data._hp) {
      console.log("Honeypot field filled, likely spam. Silently succeeding.");
      // Show generic success to not alert the bot
      toast({
        title: "¡Confirmación Recibida!",
        description: "¡Gracias por tu confirmación!",
      });
      form.reset();
      return;
    }
    
    if (!firestore) {
       toast({
        variant: "destructive",
        title: "¡Oh no! Algo salió mal.",
        description: "No se pudo conectar a la base de datos. Por favor, inténtalo de nuevo más tarde.",
      });
      return;
    }

    const guestData = {
      name: data.name,
      phone: data.phone || '',
      attending: data.attending,
      companions: data.attending ? data.companions : 0, // Ensure companions is 0 if not attending
      message: data.message || '',
      slug: data.slug,
      createdAt: serverTimestamp(),
      source: 'website-client',
    };
    
    const guestsCollection = collection(firestore, 'guests');
    
    addDoc(guestsCollection, guestData).catch(serverError => {
      console.error("Error writing document: ", serverError);
      
      const contextualError = new FirestorePermissionError({
        path: guestsCollection.path,
        operation: 'create',
        requestResourceData: guestData,
      });

      errorEmitter.emit('permission-error', contextualError);
      
      toast({
          variant: "destructive",
          title: "Error de Permiso",
          description: "No se pudo guardar tu confirmación. Verifica que los datos sean válidos.",
      });
    });

    if (data.attending) {
      toast({
        title: "¡Confirmación Recibida!",
        description: "¡Gracias, nos vemos en el gran día!",
      });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      toast({
        title: "Confirmación Recibida",
        description: "Lamentamos que no puedas acompañarnos. ¡Te tendremos en nuestros pensamientos!",
      });
    }
    
    form.reset();
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
                      No podré asistir.
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {attendingValue === true && (
          <FormField
            control={form.control}
            name="companions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acompañantes</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el número de acompañantes" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num === 0 ? "Solo yo" : `${num} ${num === 1 ? "acompañante" : "acompañantes"}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {attendingValue === false ? "Déjanos un mensaje" : "Mensaje para los novios (Opcional)"}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={
                    attendingValue === false 
                      ? "Lamentamos que no puedas venir, ¿te gustaría dejar un mensaje para los novios?"
                      : "¡Estamos muy emocionados de celebrar con ustedes!"
                  } 
                  {...field} 
                />
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

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || attendingValue === undefined}>
          {form.formState.isSubmitting ? "Enviando..." : "Enviar Confirmación"}
        </Button>
      </form>
    </Form>
  );
}
