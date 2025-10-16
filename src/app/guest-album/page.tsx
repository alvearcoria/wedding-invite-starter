
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFirestore, useStorage } from '@/firebase/provider';
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, startAt, limit as firestoreLimit } from 'firebase/firestore';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

// --- Type Definitions ---

type FileWithPreview = File & { preview: string };

type UploadProgress = {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
};

type GuestPhoto = {
  id: string;
  downloadURL: string;
  uploadedAt?: any;
};


// --- Firestore Fetch Logic ---

const SLUG = siteConfig.slug;
const PAGE_SIZE = 20;

async function fetchRandomPhotos(firestore: any): Promise<GuestPhoto[]> {
  const pivot = Math.random();

  // Q1: fotos con rand >= pivot
  const q1 = query(
    collection(firestore, "photos"),
    where("slug", "==", SLUG),
    orderBy("rand", "asc"),
    startAt(pivot),
    firestoreLimit(PAGE_SIZE)
  );

  const res1 = await getDocs(q1);
  let items = res1.docs.map(d => ({ id: d.id, ...d.data() })) as GuestPhoto[];

  // Si no alcanzamos 20, Q2: rand < pivot
  if (items.length < PAGE_SIZE) {
    const remaining = PAGE_SIZE - items.length;
    const q2 = query(
      collection(firestore, "photos"),
      where("slug", "==", SLUG),
      orderBy("rand", "asc"),
      firestoreLimit(remaining)
    );
    const res2 = await getDocs(q2);

    const seen = new Set(items.map(x => x.id));
    res2.docs.forEach(d => {
      if (!seen.has(d.id)) {
        items.push({ id: d.id, ...d.data() } as GuestPhoto);
      }
    });
  }

  // Barajeo ligero
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items.slice(0, PAGE_SIZE);
}


// --- UI Components ---

function UploadModalContent({ closeDialog, onUploadComplete }: { closeDialog: () => void; onUploadComplete: () => void; }) {
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
            console.error("UPLOAD ERROR >>>", error.code, error.message);
            toast({ variant: "destructive", title: "Error de Subida", description: `No se pudo subir ${file.name}: ${error.message}` });
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
                rand: Math.random(),
              });

              setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, progress: 100, status: 'completed' } : u));
              resolve();
            } catch (e: any) {
               console.error('FIRESTORE ERROR >>>', e?.code ?? e);
               toast({
                variant: 'destructive',
                title: 'Error de Base de Datos',
                description: e.message || 'No se pudo guardar la referencia de la foto.',
              });
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
      onUploadComplete();
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

  const allCompleted = uploads.length > 0 && uploads.every(u => u.status === 'completed');

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


function GuestAlbumGrid({ photos }: { photos: GuestPhoto[] }) {
  if (!photos?.length) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center opacity-70">
        <div className="text-2xl font-semibold mb-2">Recuerdos Compartidos</div>
        <p>¡Aún no hay fotos! Sé el primero en compartir 😊</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
      {photos.map((p) => (
         <Dialog key={p.id}>
            <DialogTrigger asChild>
                <div className="block overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group aspect-square">
                    <Image 
                        src={p.downloadURL} 
                        alt="Recuerdo de la boda" 
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-[95vw] p-0 bg-transparent border-none shadow-none">
                 <DialogHeader className="sr-only">
                    <DialogTitle>Imagen del álbum de invitados</DialogTitle>
                    <DialogDescription>
                      Una imagen ampliada del álbum de invitados de la boda.
                    </DialogDescription>
                 </DialogHeader>
                 <Image 
                    src={p.downloadURL} 
                    alt="Recuerdo de la boda ampliado" 
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain rounded-lg shadow-2xl max-h-[90vh]" 
                />
            </DialogContent>
         </Dialog>
      ))}
    </div>
  );
}


function GuestGallery({ version, onUploadComplete }: { version: number; onUploadComplete: () => void; }) {
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firestore = useFirestore();

  const loadPhotos = useCallback(async () => {
    if (!firestore) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPhotos = await fetchRandomPhotos(firestore);
      setPhotos(fetchedPhotos);
    } catch (e: any) {
      console.error(e);
      setError("No se pudieron cargar las fotos. Por favor, revisa los permisos de Firestore y asegúrate de que el índice compuesto ('slug' asc, 'rand' asc) exista.");
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos, version]);

  if (isLoading) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="w-full aspect-square rounded-xl" />
            ))}
        </div>
    );
  }

  if (error) {
     return (
        <Card className="shadow-lg bg-destructive/10">
            <CardHeader>
                <CardTitle className="text-destructive">Error al Cargar la Galería</CardTitle>
                <CardDescription className="text-destructive/80">{error}</CardDescription>
            </CardHeader>
        </Card>
    );
  }

  return <GuestAlbumGrid photos={photos} />;
}


// --- Main Page Component ---
export default function GuestAlbumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [version, setVersion] = useState(0); 

  const handleUploadComplete = () => {
    setVersion(v => v + 1);
  };
  
  return (
    <div className="bg-muted/20 min-h-screen">
      <main className="container mx-auto flex flex-1 flex-col gap-8 p-4 md:p-8">
        
        <Card className="shadow-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-headline text-3xl font-bold tracking-tight">Álbum de Invitados</h1>
                    <p className="text-muted-foreground">¡Sube tus fotos y revive los mejores momentos!</p>
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button size="lg" className="w-full sm:w-auto"><Icon name="camera" className="mr-2"/> Comparte Tus Momentos</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Sube tus fotos</DialogTitle>
                                <DialogDescription>
                                    Selecciona o arrastra las imágenes que quieras compartir.
                                </DialogDescription>
                            </DialogHeader>
                            <UploadModalContent 
                                closeDialog={() => setIsModalOpen(false)}
                                onUploadComplete={handleUploadComplete}
                            />
                        </DialogContent>
                    </Dialog>
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                        <a href="/"><Icon name="arrow-left" className="mr-2" />Volver</a>
                    </Button>
                </div>
            </CardHeader>
        </Card>
        
        <GuestGallery version={version} onUploadComplete={handleUploadComplete} />

      </main>
    </div>
  );
}


    