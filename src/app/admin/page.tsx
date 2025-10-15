
'use client';

import { useMemo } from 'react';
import { useFirestore } from '@/firebase/provider';
import { collection, query } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { siteConfig } from '@/config/site';
import type { RsvpInput } from '@/types/rsvp';
import Papa from 'papaparse';
import { useMemoFirebase } from '@/firebase/provider';
import { Icon } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

function AdminStats({ guests }: { guests: RsvpInput[] | null }) {
  const stats = useMemo(() => {
    if (!guests) {
      return { confirmed: 0, declined: 0, companions: 0, total: 0, messages: 0, confirmedPercentage: 0 };
    }
    const confirmedList = guests.filter(g => g.attending);
    const declinedList = guests.filter(g => !g.attending);
    
    const confirmed = confirmedList.length;
    const declined = declinedList.length;
    const totalResponses = confirmed + declined;
    
    const companions = confirmedList.reduce((acc, g) => acc + (g.companions ?? 0), 0);
    const totalAttendees = confirmed + companions;
    const messages = guests.filter(g => g.message).length;

    const confirmedPercentage = totalResponses > 0 ? (confirmed / totalResponses) * 100 : 0;

    return { confirmed, declined, companions, total: totalAttendees, messages, confirmedPercentage };
  }, [guests]);

  const statCards = [
    { title: 'Total de Asistentes', value: stats.total, note: `${stats.confirmed} invitados + ${stats.companions} acompañantes`, IconName: 'party-popper' as const, color: 'text-primary' },
    { title: 'Invitados que Asistirán', value: stats.confirmed, note: `${stats.confirmedPercentage.toFixed(0)}% de las respuestas`, IconName: 'user-check' as const, color: 'text-green-500' },
    { title: 'Invitados que No Asistirán', value: stats.declined, note: 'Respuestas negativas recibidas', IconName: 'frown' as const, color: 'text-red-500' },
    { title: 'Total con Mensajes', value: stats.messages, note: 'Invitados que dejaron un mensaje', IconName: 'message-square' as const, color: 'text-blue-500' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card, i) => (
        <Card key={i} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <Icon name={card.IconName} className={`h-5 w-5 text-muted-foreground ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.note}</p>
            {card.title === 'Invitados que Asistirán' && (
               <Progress value={stats.confirmedPercentage} className="mt-2 h-2" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function GuestsTable({ guests, onExport }: { guests: RsvpInput[] | null, onExport: () => void }) {
    if (!guests) {
        return (
          <Card className="flex flex-col items-center justify-center h-96 border-dashed">
            <Icon name="loader-circle" className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Cargando invitados...</p>
          </Card>
        );
    }

    if (guests.length === 0) {
        return (
          <Card className="flex flex-col items-center justify-center h-96 border-dashed">
            <Icon name="users" className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Aún no hay confirmaciones</p>
            <p className="text-muted-foreground text-sm">Cuando tus invitados respondan, los verás aquí.</p>
          </Card>
        );
    }

  return (
    <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Lista de Invitados ({guests.length})</CardTitle>
                <CardDescription>Aquí están todas las respuestas recibidas hasta ahora.</CardDescription>
            </div>
            <Button onClick={onExport} size="sm">
              <Icon name="download" className="mr-2 h-4 w-4" />
              Exportar a CSV
            </Button>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[450px]">
                <Table>
                <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                    <TableHead className="w-[250px]">Nombre</TableHead>
                    <TableHead>Asistencia</TableHead>
                    <TableHead className="text-center">Acompañantes</TableHead>
                    <TableHead>Mensaje</TableHead>
                    <TableHead>Contacto (Teléfono)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guests.map((guest, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>
                            <Badge variant={guest.attending ? "default" : "destructive"} className={guest.attending ? "bg-green-600/80" : "bg-red-500/80"}>
                                {guest.attending ? 'Sí, asistirá' : 'No asistirá'}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center font-mono">{guest.attending ? guest.companions : '—'}</TableCell>
                        <TableCell className="max-w-[200px] truncate italic text-muted-foreground">
                            {guest.message || '—'}
                        </TableCell>
                         <TableCell className="text-muted-foreground font-mono text-xs">{guest.phone || '—'}</TableCell>
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
  
  const guestsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'invitations', siteConfig.slug, 'guests'));
  }, [firestore]);

  const { data: guests, isLoading, error } = useCollection<RsvpInput>(guestsQuery);

  const handleExport = () => {
    if (!guests) return;

    const dataToExport = guests.map(g => ({
      Nombre: g.name,
      Asiste: g.attending ? 'Sí' : 'No',
      Acompañantes: g.attending ? g.companions : 0,
      Mensaje: g.message || '',
      Teléfono: g.phone || '',
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `invitados_${siteConfig.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (error) {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Error al Cargar los Datos</CardTitle>
                    <CardDescription className="text-destructive/80">
                        No se pudieron cargar los datos de los invitados. Es posible que haya un problema con las reglas de seguridad de Firestore.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <pre className="text-xs bg-destructive/10 p-4 rounded-md overflow-x-auto">
                        <code>{error.message}</code>
                    </pre>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="bg-muted/20 min-h-screen">
      <main className="container mx-auto flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
            <p className="text-muted-foreground">Bienvenido al panel de tu boda. Aquí puedes ver todas las confirmaciones en tiempo real.</p>
        </div>
        <AdminStats guests={guests} />
        <GuestsTable guests={guests} onExport={handleExport} />
      </main>
    </div>
  );
}
