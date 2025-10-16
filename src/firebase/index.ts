'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp;

// IMPORTANT: This function is modified to be "bulletproof" against caching issues.
export function initializeFirebase() {
  try {
    // Always initialize a new app instance using the explicit config.
    // This avoids issues with getApps() or getApp() returning a cached, incorrect instance.
    firebaseApp = initializeApp(firebaseConfig);
  } catch (e: any) {
    // If it fails, it might be because it was already initialized.
    // In that case, we fall back to getApp().
    if (e.code !== 'duplicate-app') {
      console.error("Firebase initialization failed:", e);
      // If it's a different error, we re-throw it.
      throw e;
    }
    firebaseApp = getApp();
  }

  return getSdks(firebaseApp);
}

export function getSdks(app: FirebaseApp) {
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app)
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
