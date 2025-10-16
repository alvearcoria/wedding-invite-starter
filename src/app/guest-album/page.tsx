
'use client';

import { useState, useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFirestore, useFirebaseApp, useMemoFirebase, useUser } from '@/firebase/provider';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useCollection } from '@/firebase/firestore/use-collection';
import { siteConfig } from '@/config/site';
import { useToast } from '@/hooks/use-toast';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

type FileWithPreview = File & { preview: string };
type UploadProgress = {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
};
type Photo = {
  downloadURL: string;
  caption?: string;
};

function GuestGallery() {
  const firestore = useFirestore();
  const { isUserLoading } = useUser();

  const photosQuery = useMemoFirebase(() => {
    // Wait until the user is authenticated (even anonymously) before creating the query.
    if (isUserLoading || !firestore) return null;
    return query(
      collection(firestore, 'invitations', siteConfig.slug, 'photos'),
      orderBy('uploadedAt', 'desc')
    );
  }, [firestore, isUserLoading]);

  const { data: photos, isLoading, error } = useCollection<Photo>(photosQuery);
  const hasPhotos = photos && photos.length > 0;

  // Show a more specific loading state while authentication is in progress.
  if (isUserLoading || (isLoading && !photos)) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="aspect-square w-full" />
        ))}
      </div>
    );
  }

  if (!hasPhotos && !isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed rounded-lg bg-muted/50">
          <Icon name="camera" className="h-16 w-16 text-muted-foreground" />
          <p className="mt-4 text-lg font-semibold">¡Sé el primero en compartir un momento!</p>
          <p className="text-muted-foreground">Las fotos que subas aparecerán aquí para todos.</p>
        </div>
      );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed rounded-lg bg-destructive/10 text-destructive">
          <Icon name="frown" className="h-16 w-16" />
          <p className="mt-4 text-lg font-semibold">Error al Cargar la Galería</p>
          <p className="text-destructive/80">No se pudieron cargar las fotos. Por favor, inténtalo de nuevo más tarde.</p>
          <pre className="mt-2 text-xs bg-destructive/10 p-2 rounded"><code>{error.message}</code></pre>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {photos?.map((photo, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <Image
            src={photo.downloadURL}
            alt={photo.caption || 'Foto de invitado'}
            width={400}
            height={400}
            className="w-full h-full object-cover aspect-square transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

function UploadModalContent({ closeDialog }: { closeDialog: () => void }) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const firebaseApp = useFirebaseApp();
  
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
  };
  
  const handleUpload = async () => {
    console.log("DEBUG: handleUpload iniciado.");
    if (files.length === 0) {
      console.log("DEBUG: No hay archivos seleccionados. Saliendo.");
      return;
    }
    console.log(`DEBUG: Hay ${files.length} archivos seleccionados.`);

    if (!firestore || !firebaseApp) {
      const errorMsg = "DEBUG: Error de configuración - La conexión con Firebase no está lista.";
      console.error(errorMsg);
      toast({ variant: "destructive", title: "Error de configuración", description: "La conexión con Firebase no está lista."});
      return;
    }
    
    console.log("DEBUG: Instancias de Storage y Firestore obtenidas.");
    setIsUploading(true);
    setUploads(files.map(f => ({ fileName: f.name, progress: 0, status: 'pending' })));

    const storage = getStorage(firebaseApp);
    const photosCollection = collection(firestore, 'invitations', siteConfig.slug, 'photos');
    
    const uploadPromises = files.map(file => {
      return new Promise<void>((resolve, reject) => {
        console.log(`DEBUG: [${file.name}] - Iniciando proceso de subida.`);
        const fileId = crypto.randomUUID();
        const storagePath = `weddings/${siteConfig.slug}/uploads/${fileId}-${file.name}`;
        const storageRef = ref(storage, storagePath);
        const metadata = { contentType: file.type || 'image/jpeg' };
        
        console.log(`DEBUG: [${file.name}] - Ruta de Storage: ${storagePath}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        console.log(`DEBUG: [${file.name}] - Tarea de subida creada.`);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(`DEBUG: [${file.name}] - Progreso: ${progress}%, Estado: ${snapshot.state}`);
            setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, progress, status: 'uploading' } : u));
          },
          (error) => {
            console.error(`DEBUG: [${file.name}] - ERROR DE SUBIDA A STORAGE:`, error.code, error.message);
            setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, status: 'error', error: `Storage Error: ${error.code}` } : u));
            reject(error);
          },
          async () => {
            try {
              console.log(`DEBUG: [${file.name}] - Subida a Storage completada. Obteniendo URL de descarga.`);
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log(`DEBUG: [${file.name}] - URL de descarga obtenida. Guardando en Firestore.`);
              
              await addDoc(photosCollection, {
                storagePath,
                downloadURL,
                uploadedAt: serverTimestamp(),
                uploader: 'guest-upload',
              });
              console.log(`DEBUG: [${file.name}] - Guardado en Firestore completado.`);

              setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, progress: 100, status: 'completed' } : u));
              resolve();
            } catch (e: any) {
              console.error(`DEBUG: [${file.name}] - ERROR DE ESCRITURA EN FIRESTORE:`, e.code, e.message);
              setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, status: 'error', error: `Firestore Error: ${e.code}` } : u));
              reject(e);
            }
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
      console.log("DEBUG: Todas las subidas completadas con éxito.");
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
      console.error('DEBUG: Al menos una subida falló.', error);
      toast({
        variant: 'destructive',
        title: 'Error en la subida',
        description: 'Algunas fotos no se pudieron subir. Revisa la consola para más detalles.',
      });
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


export default function GuestAlbumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-muted/40 min-h-screen">
      <main className="container mx-auto flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
           <div className="flex flex-col gap-1">
             <h1 className="text-3xl font-bold tracking-tight">Álbum de Invitados</h1>
             <p className="text-muted-foreground">¡Sube tus fotos y revive los mejores momentos de la boda!</p>
           </div>
            <div className="flex gap-2">
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
                    <a href="/"><Icon name="arrow-right" className="mr-2" />Volver</a>
                </Button>
            </div>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Recuerdos Compartidos</h2>
            <GuestGallery />
        </div>
      </main>
    </div>
  );
}

    
