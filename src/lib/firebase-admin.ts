
import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

// This function ensures that we initialize the app only once.
const initializeAdminApp = () => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Replace escaped newlines with actual newlines.
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };

  try {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
    // Re-throw the error to make it visible to the caller.
    throw new Error('Failed to initialize Firebase Admin SDK.');
  }
};

// Export a function that returns the Firestore instance.
// This lazy-initialization approach prevents the SDK from being initialized at module load time.
export const adminDb = () => {
  initializeAdminApp();
  return admin.firestore();
};
