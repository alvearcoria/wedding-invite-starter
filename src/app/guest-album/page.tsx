'use client';

import { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFirestore, useStorage, useMemoFirebase } from '@/firebase/provider';
import { collection, addDoc, serverTimestamp, query, where, orderBy, limit } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { siteConfig } from '@/config/site';
import { useToast } from '@/hooks/use-toast';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCollection } from '@/firebase/firestore/use-collection';

type FileWithPreview = File & { preview: string };
type UploadProgress = {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
};

// --- Upload Modal Component ---
function UploadModalContent({ closeDialog }: { closeDialog: () => void }) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();
  
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== acceptedFiles.length) {
      toast({
        variant: 'destructive',
        title: 'Archivos no válidos',
        description: 'Solo se pueden subir imágenes.',
      });
    }

    const filesWithPreview = validFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(prev => [...prev, ...filesWithPreview].slice(0, 20));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
  };
  
  const handleUpload = async () => {
    if (files.length === 0 || !storage || !firestore) return;
    
    setIsUploading(true);
    setUploads(files.map(f => ({ fileName: f.name, progress: 0, status: 'pending' })));
    
    const uploadPromises = files.map(file => {
      return new Promise<void>((resolve, reject) => {
        const fileId = crypto.randomUUID();
        const storagePath = `weddings/${siteConfig.slug}/uploads/${fileId}-${file.name}`;
        const storageRef = ref(storage, storagePath);
        const metadata = { contentType: file.type || 'image/jpeg' };
        
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, progress, status: 'uploading' } : u));
          },
          (error) => {
            toast({ variant: "destructive", title: "Error de Subida", description: `No se pudo subir ${file.name}: ${error.code}` });
            setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, status: 'error', error: `Storage Error: ${error.code}` } : u));
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const photosCollection = collection(firestore, 'photos');
              await addDoc(photosCollection, {
                slug: siteConfig.slug,
                storagePath,
                downloadURL,
                uploadedAt: serverTimestamp(),
                uploader: 'guest-upload',
              });

              setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, progress: 100, status: 'completed' } : u));
              resolve();
            } catch (e: any) {
              toast({ variant: "destructive", title: "Error de Base de Datos", description: `No se pudo guardar la referencia de ${file.name}. Código: ${e.code}` });
              setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, status: 'error', error: `Firestore Error: ${e.code}` } : u));
              reject(e);
            }
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
      toast({
        title: '¡Subida completada!',
        description: 'Tus fotos han sido añadidas al álbum. ¡Gracias por compartir!',
      });
      setTimeout(() => {
        closeDialog();
        setFiles([]);
        setUploads([]);
        setIsUploading(false);
      }, 1500);
    } catch (error) {
      setIsUploading(false);
    }
  };

  const allCompleted = useMemo(() => uploads.length > 0 && uploads.every(u => u.status === 'completed'), [uploads]);

  return (
     <div className="space-y-6">
        <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
            }`}
        >
            <input {...getInputProps()} />
            <Icon name="upload-cloud" className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 font-semibold">
            {isDragActive ? 'Suelta las imágenes aquí' : 'Arrastra tus fotos o haz clic para seleccionar'}
            </p>
            <p className="text-sm text-muted-foreground">Solo se permiten archivos de imagen (hasta 20 por tanda).</p>
        </div>
        
        {files.length > 0 && (
            <div className="space-y-4">
            <h3 className="font-semibold">Fotos Seleccionadas ({files.length})</h3>
            <ScrollArea className="h-48">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-4">
                {files.map(file => (
                    <div key={file.name} className="relative group">
                    <Image
                        src={file.preview}
                        alt={file.name}
                        width={150}
                        height={150}
                        onLoad={() => URL.revokeObjectURL(file.preview)}
                        className="rounded-md object-cover aspect-square"
                    />
                    {!isUploading && (
                        <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={() => removeFile(file.name)}
                        >
                        <Icon name="x" className="h-4 w-4" />
                        </Button>
                    )}
                    </div>
                ))}
                </div>
            </ScrollArea>
            </div>
        )}
        
        {uploads.length > 0 && (
            <div className="space-y-4">
                <h3 className="font-semibold">Progreso de Subida</h3>
                <div className="space-y-3">
                {uploads.map(upload => (
                    <div key={upload.fileName}>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="truncate max-w-[70%]">{upload.fileName}</span>
                        <span className="text-muted-foreground">
                            {upload.status === 'completed' && <Icon name="check" className="h-4 w-4 text-green-500 inline"/>}
                            {upload.status === 'error' && <Icon name="frown" className="h-4 w-4 text-red-500 inline"/>}
                            {upload.status === 'uploading' && `${upload.progress}%`}
                        </span>
                    </div>
                    <Progress value={upload.progress} />
                    {upload.error && <p className="text-xs text-destructive mt-1">{upload.error}</p>}
                    </div>
                ))}
                </div>
            </div>
        )}

        {allCompleted ? (
             <Button onClick={closeDialog} size="lg" className="w-full">
                Cerrar
            </Button>
        ) : (
            <Button onClick={handleUpload} disabled={files.length === 0 || isUploading} size="lg" className="w-full">
                {isUploading ? <><Icon name="loader-circle" className="animate-spin mr-2"/> Subiendo...</> : <><Icon name="upload" className="mr-2"/> Subir {files.length} foto(s)</>}
            </Button>
        )}
    </div>
  );
}


// --- Guest Photo Gallery Component ---
function GuestGallery() {
    const firestore = useFirestore();

    const photosQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(
            collection(firestore, 'photos'),
            where('slug', '==', siteConfig.slug),
            orderBy('uploadedAt', 'desc'),
            limit(20)
        );
    }, [firestore]);

    const { data: photos, isLoading } = useCollection<{ downloadURL: string }>(photosQuery);

    if (isLoading) {
        return (
            <Card className="flex flex-col items-center justify-center h-96 border-dashed">
                <Icon name="loader-circle" className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Cargando la galería...</p>
            </Card>
        );
    }

    if (!photos || photos.length === 0) {
        return (
             <Card className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed rounded-lg bg-card/80">
                <Icon name="image" className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-bold tracking-tight">Recuerdos Compartidos</h2>
                <p className="mt-2 text-muted-foreground">
                    ¡Sé el primero en compartir un momento especial! Las fotos que subas aparecerán aquí.
                </p>
            </Card>
        );
    }
  
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Últimos Recuerdos</CardTitle>
                <CardDescription>Estos son los últimos momentos compartidos por nuestros invitados. ¡Gracias!</CardDescription>
            </CardHeader>
            <CardContent>
                 <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {photos.map((photo) => (
                        <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <Card className="overflow-hidden">
                                <CardContent className="flex aspect-[4/3] items-center justify-center p-0">
                                <Image
                                    src={photo.downloadURL}
                                    alt="Foto de invitado"
                                    width={600}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-12" />
                    <CarouselNext className="mr-12" />
                </Carousel>
            </CardContent>
        </Card>
    );
}


// --- Main Page Component ---
export default function GuestAlbumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-muted/20 min-h-screen">
      <main className="container mx-auto flex flex-1 flex-col gap-8 p-4 md:p-8">
        
        {/* Header Card */}
        <Card className="shadow-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-headline text-3xl font-bold tracking-tight">Álbum de Invitados</h1>
                    <p className="text-muted-foreground">¡Sube tus fotos y revive los mejores momentos de la boda!</p>
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button size="lg"><Icon name="camera" className="mr-2"/> Comparte Tus Momentos</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Sube tus fotos</DialogTitle>
                                <DialogDescription>
                                    Selecciona o arrastra las imágenes que quieras compartir.
                                </DialogDescription>
                            </DialogHeader>
                            <UploadModalContent closeDialog={() => setIsModalOpen(false)} />
                        </DialogContent>
                    </Dialog>
                    <Button asChild variant="outline" size="lg">
                        <a href="/"><Icon name="arrow-left" className="mr-2" />Volver a la Invitación</a>
                    </Button>
                </div>
            </CardHeader>
        </Card>
        
        {/* Gallery Section */}
        <GuestGallery />

      </main>
    </div>
  );
}
