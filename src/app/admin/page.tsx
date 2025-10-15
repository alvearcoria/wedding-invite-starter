'use client';

import { useMemo } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { siteConfig } from '@/config/site';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, UserCheck, UserX, MessageSquare } from 'lucide-react';
import type { RsvpInput } from '@/types/rsvp';

function AdminStats({ guests }: { guests: RsvpInput[] | null }) {
  const stats = useMemo(() => {
    if (!guests) {
      return { confirmed: 0, declined: 0, companions: 0, total: 0 };
    }
    const confirmed = guests.filter(g => g.attending).length;
    const declined = guests.filter(g => !g.attending).length;
    const companions = guests.reduce((acc, g) => acc + (g.attending ? g.companions : 0), 0);
    const totalAttendees = confirmed + companions;

    return { confirmed, declined, companions, total: totalAttendees };
  }, [guests]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Asistentes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            {stats.confirmed} invitados + {stats.companions} acompañantes
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.confirmed}</div>
           <p className="text-xs text-muted-foreground">Invitados que asistirán</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">No Asistirán</CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.declined}</div>
          <p className="text-xs text-muted-foreground">Invitados que no podrán asistir</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mensajes</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{guests?.filter(g => g.message).length ?? 0}</div>
          <p className="text-xs text-muted-foreground">Invitados que dejaron un mensaje</p>
        </CardContent>
      </Card>
    </div>
  );
}

function GuestsTable({ guests }: { guests: RsvpInput[] | null }) {
    if (!guests) {
        return <div className="flex items-center justify-center h-64 bg-card rounded-lg"><p>Cargando invitados...</p></div>
    }

    if (guests.length === 0) {
        return <div className="flex items-center justify-center h-64 bg-card rounded-lg"><p>Aún no hay confirmaciones.</p></div>
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Lista de Invitados</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[400px]">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Asistencia</TableHead>
                    <TableHead className="text-center">Acompañantes</TableHead>
                    <TableHead>Mensaje</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guests.map((guest, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>
                        <Badge variant={guest.attending ? "default" : "destructive"}>
                            {guest.attending ? 'Sí, asistirá' : 'No asistirá'}
                        </Badge>
                        </TableCell>
                        <TableCell className="text-center">{guest.attending ? guest.companions : '—'}</TableCell>
                        <TableCell className="max-w-[200px] truncate italic text-muted-foreground">
                            {guest.message || 'Sin mensaje'}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </ScrollArea>
        </CardContent>
    </Card>
  );
}


export default function AdminPage() {
  const firestore = useFirestore();
  
  const guestsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'invitations', siteConfig.slug, 'guests'));
  }, [firestore]);

  const { data: guests, isLoading, error } = useCollection<RsvpInput>(guestsQuery as any);

  if (isLoading) {
    return <div className="container mx-auto p-4 md:p-8">Cargando...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 md:p-8">Error: {error.message}</div>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Panel de Administración de RSVP</h1>
      </div>
      <AdminStats guests={guests} />
      <GuestsTable guests={guests} />
    </main>
  );
}
