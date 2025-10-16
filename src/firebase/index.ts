'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// IMPORTANTE: NO MODIFICAR ESTA FUNCIÓN
export function initializeFirebase() {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  
  // Forzar el bucket de Storage correcto.
  const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);

  // Inicializar App Check
  if (typeof window !== 'undefined') {
    try {
      // Clave de prueba de reCAPTCHA v3. Funciona solo en localhost.
      // TODO: Reemplazar con tu propia clave de sitio para producción.
      const recaptchaSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
      
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (error) {
      console.error('Error al inicializar Firebase App Check:', error);
    }
  }

  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app),
    storage: storage, // Exportar la instancia de storage
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';