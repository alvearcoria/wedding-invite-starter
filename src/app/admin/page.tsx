
'use client';

import { useMemo, useEffect, useState } from 'react';
import type { RsvpInput } from '@/types/rsvp';
import Papa from 'papaparse';
import { Icon } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface GuestData extends RsvpInput {
  id: string;
  createdAt: {
    toDate: () => Date;
  };
}

function AdminStats({ guests, isLoading }: { guests: GuestData[] | null; isLoading: boolean; }) {
    const stats = useMemo(() => {
        if (!guests) {
            return {
                totalAttending: 0,
                totalNotAttending: 0,
                totalCompanions: 0,
                totalGuests: 0,
            };
        }
        const attending = guests.filter(g => g.attending);
        const notAttending = guests.filter(g => !g.attending);
        const totalCompanions = attending.reduce((sum, g) => sum + (g.companions ?? 0), 0);

        return {
            totalAttending: attending.length,
            totalNotAttending: notAttending.length,
            totalCompanions: totalCompanions,
            totalGuests: attending.length + totalCompanions,
        };
    }, [guests]);

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Invitados que Asistirán</CardTitle>
                    <Icon name="user-check" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalAttending}</div>
                    <p className="text-xs text-muted-foreground">Personas confirmadas</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Acompañantes</CardTitle>
                    <Icon name="users" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{stats.totalCompanions}</div>
                    <p className="text-xs text-muted-foreground">Acompañantes adicionales</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Asistentes</CardTitle>
                    <Icon name="party-popper" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalGuests}</div>
                    <p className="text-xs text-muted-foreground">Total de personas en el evento</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">No Asistirán</CardTitle>
                    <Icon name="user-x" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalNotAttending}</div>
                    <p className="text-xs text-muted-foreground">Personas que no podrán asistir</p>
                </CardContent>
            </Card>
        </div>
    );
}

function GuestListTable({ guests, isLoading, error }: { guests: GuestData[] | null; isLoading: boolean; error: Error | null }) {

    if (isLoading) {
         return (
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
        )
    }

    if (error) {
         return (
            <div className="flex flex-col items-center justify-center h-64 border-dashed border-2 rounded-lg">
                <Icon name="frown" className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-semibold">Error al cargar los invitados</p>
                <p className="text-muted-foreground text-sm text-center px-4">
                    Hubo un problema al consultar la base de datos. Es probable que sea un problema de permisos.
                </p>
                 <p className="text-xs text-muted-foreground mt-2">{error.message}</p>
            </div>
        );
    }
    
    if (!guests || guests.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center h-64 border-dashed border-2 rounded-lg">
                <Icon name="users" className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-semibold">Aún no hay confirmaciones</p>
                <p className="text-muted-foreground text-sm">Cuando los invitados confirmen, aparecerán aquí.</p>
            </div>
        )
    }
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead className="text-center">Asistencia</TableHead>
                    <TableHead className="text-center">Acompañantes</TableHead>
                    <TableHead>Mensaje</TableHead>
                    <TableHead>Fecha</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {guests.map((guest) => (
                    <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>{guest.phone || '-'}</TableCell>
                        <TableCell className="text-center">
                            <Badge variant={guest.attending ? "default" : "secondary"}>
                                {guest.attending ? 'Sí' : 'No'}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">{guest.companions}</TableCell>
                        <TableCell className="max-w-[250px] truncate">{guest.message || '-'}</TableCell>
                        <TableCell>{guest.createdAt?.toDate().toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default function AdminPage() {
  const firestore = useFirestore();

  const guestsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // This query now correctly targets the 'guests' collection and filters by the slug.
    return query(collection(firestore, 'guests'), where('slug', '==', siteConfig.slug));
  }, [firestore]);

  const { data: guests, isLoading, error } = useCollection<GuestData>(guestsQuery);
  
  const handleExport = () => {
    if (!guests) return;
    const csv = Papa.unparse(guests.map(g => ({
        Nombre: g.name,
        Asiste: g.attending ? 'Sí' : 'No',
        Acompañantes: g.companions,
        Teléfono: g.phone,
        Mensaje: g.message,
        Fecha: g.createdAt?.toDate().toISOString(),
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `invitados_${siteConfig.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <main className="container mx-auto flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
                <p className="text-muted-foreground">Bienvenido al panel de tu boda. Aquí puedes ver todas las confirmaciones en tiempo real.</p>
            </div>
            <Button onClick={handleExport} disabled={!guests || guests.length === 0}>
                <Icon name="download" className="mr-2 h-4 w-4" />
                Exportar a CSV
            </Button>
        </div>
        
        <AdminStats guests={guests} isLoading={isLoading} />
        
        <Card>
            <CardHeader>
                <CardTitle>Lista de Invitados</CardTitle>
                <CardDescription>
                    Aquí se muestran todas las respuestas del formulario de RSVP.
                </CardDescription>
            </CardHeader>
            <CardContent>
               <GuestListTable guests={guests} isLoading={isLoading} error={error} />
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
