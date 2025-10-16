
'use client';

import { useMemo } from 'react';
import type { RsvpInput } from '@/types/rsvp';
import Papa from 'papaparse';
import { Icon } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';

export default function AdminPage() {
  const handleExport = () => {
    // This function will be disabled for now
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <main className="container mx-auto flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
            <p className="text-muted-foreground">Bienvenido al panel de tu boda. Aquí puedes ver todas las confirmaciones en tiempo real.</p>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Función no disponible</CardTitle>
                <CardDescription>
                    La visualización de la lista de invitados no está disponible en este momento debido a restricciones de seguridad.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center h-64 border-dashed border-2 rounded-lg">
                    <Icon name="frown" className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-lg font-semibold">No se pueden mostrar los invitados</p>
                    <p className="text-muted-foreground text-sm text-center px-4">
                        La configuración de seguridad actual de la base de datos no permite leer la lista de invitados desde el navegador.
                    </p>
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
