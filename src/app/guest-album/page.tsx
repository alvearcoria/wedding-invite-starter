
'use client';

import { useState, useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth, useFirestore, useFirebaseApp, useMemoFirebase } from '@/firebase/provider';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useCollection } from '@/firebase/firestore/use-collection';
import { siteConfig } from '@/config/site';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

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
  
  const photosQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'invitations', siteConfig.slug, 'photos'),
      orderBy('uploadedAt', 'desc')
    );
  }, [firestore]);

  const { data: photos, isLoading, error } = useCollection<Photo>(photosQuery);
  const hasPhotos = photos && photos.length > 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="aspect-square w-full" />
        ))}
      </div>
    );
  }

  if (!hasPhotos) {
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
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {photos.map((photo, index) => (
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

export default function GuestAlbumPage() {
  const { toast } = useToast();
  const { user, isUserLoading } = useAuth();
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
    setFiles(prev => [...prev, ...filesWithPreview].slice(0, 20)); // Limit to 20 files at a time
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
  };
  
  const handleUpload = async () => {
    if (!user) {
      initiateAnonymousSignIn(useAuth());
      toast({
        title: 'Autenticando...',
        description: 'Preparando todo para subir tus fotos de forma segura. Inténtalo de nuevo en un momento.',
      });
      return;
    }
    
    if (!firestore || !firebaseApp) return;

    setIsUploading(true);
    const initialUploads = files.map(file => ({
      fileName: file.name,
      progress: 0,
      status: 'pending' as const,
    }));
    setUploads(initialUploads);
    
    const storage = getStorage(firebaseApp);
    const photosCollection = collection(firestore, 'invitations', siteConfig.slug, 'photos');

    const uploadPromises = files.map(file => {
      const fileId = crypto.randomUUID();
      const storagePath = `weddings/${siteConfig.slug}/uploads/${fileId}-${file.name}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type });

      return new Promise<void>((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, progress, status: 'uploading' } : u));
          },
          (error) => {
            setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, status: 'error', error: error.message } : u));
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              
              addDoc(photosCollection, {
                storagePath,
                downloadURL,
                uploadedAt: serverTimestamp(),
                uploader: 'guest-upload',
              }).catch(serverError => {
                 console.error("Error writing document to Firestore:", serverError);
              });

              setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, progress: 100, status: 'completed' } : u));
              resolve();
            } catch (error) {
              setUploads(prev => prev.map(u => u.fileName === file.name ? { ...u, status: 'error', error: (error as Error).message } : u));
              reject(error);
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
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error en la subida',
        description: 'Algunas fotos no se pudieron subir. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsUploading(false);
      setFiles([]);
    }
  };
  
  const allCompleted = useMemo(() => uploads.length > 0 && uploads.every(u => u.status === 'completed'), [uploads]);

  return (
    <div className="bg-muted/40 min-h-screen">
      <main className="container mx-auto flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
           <div className="flex flex-col gap-1">
             <h1 className="text-3xl font-bold tracking-tight">Álbum de Invitados</h1>
             <p className="text-muted-foreground">¡Sube tus fotos y revive los mejores momentos de la boda!</p>
           </div>
            <Button asChild variant="outline">
                <a href="/"><Icon name="arrow-right" className="mr-2" />Volver a la Invitación</a>
            </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Comparte Tus Momentos</CardTitle>
            <CardDescription>
              Selecciona o arrastra las imágenes que quieras compartir con todos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isUploading && !allCompleted && (
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
            )}
            
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
                        </div>
                    ))}
                    </div>
                </div>
            )}

            {allCompleted ? (
                 <Button onClick={() => setUploads([])} size="lg" className="w-full">
                    <Icon name="plus" className="mr-2" /> Subir más fotos
                </Button>
            ) : (
                <Button onClick={handleUpload} disabled={files.length === 0 || isUploading || isUserLoading} size="lg" className="w-full">
                  {isUploading ? <><Icon name="loader-circle" className="animate-spin mr-2"/> Subiendo...</> : <><Icon name="upload" className="mr-2"/> Subir {files.length} foto(s)</>}
                </Button>
            )}

          </CardContent>
        </Card>
        
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Recuerdos Compartidos</h2>
            <GuestGallery />
        </div>
      </main>
    </div>
  );
}
