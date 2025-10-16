
'use server';

/**
 * @fileOverview This file defines a Genkit flow for securely fetching guest photos.
 *
 * - getGuestPhotos - A server-side function to retrieve photo URLs from Firestore.
 * - GetGuestPhotosInput - The input type for the getGuestPhotos function.
 * - GetGuestPhotosOutput - The return type for the getGuestPhotos function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, App } from 'firebase-admin/app';

// Define schemas for input and output
export const GetGuestPhotosInputSchema = z.object({
  slug: z.string().describe('The unique slug for the wedding.'),
});
export type GetGuestPhotosInput = z.infer<typeof GetGuestPhotosInputSchema>;

export const GuestPhotoSchema = z.object({
    id: z.string(),
    downloadURL: z.string().url(),
    uploadedAt: z.string(),
});
export type GuestPhoto = z.infer<typeof GuestPhotoSchema>;

export const GetGuestPhotosOutputSchema = z.object({
  photos: z.array(GuestPhotoSchema),
});
export type GetGuestPhotosOutput = z.infer<typeof GetGuestPhotosOutputSchema>;


// Main exported function that clients will call
export async function getGuestPhotos(input: GetGuestPhotosInput): Promise<GetGuestPhotosOutput> {
  return getGuestPhotosFlow(input);
}


// Initialize Firebase Admin SDK
function getFirebaseAdminApp(): App {
  if (getApps().length) {
    return getApps()[0];
  }
  // This will use the service account credentials available in the environment
  return initializeApp();
}


// The Genkit flow implementation
const getGuestPhotosFlow = ai.defineFlow(
  {
    name: 'getGuestPhotosFlow',
    inputSchema: GetGuestPhotosInputSchema,
    outputSchema: GetGuestPhotosOutputSchema,
  },
  async ({ slug }) => {
    try {
        const app = getFirebaseAdminApp();
        const firestore = getFirestore(app);

        const photosSnapshot = await firestore
            .collection('photos')
            .where('slug', '==', slug)
            .orderBy('uploadedAt', 'desc')
            .limit(20)
            .get();

        if (photosSnapshot.empty) {
            return { photos: [] };
        }

        const photos = photosSnapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Firestore Timestamp to ISO string
            const uploadedAt = data.uploadedAt?.toDate?.()?.toISOString() ?? new Date().toISOString();
            return {
                id: doc.id,
                downloadURL: data.downloadURL,
                uploadedAt: uploadedAt,
            };
        });

        return { photos };

    } catch (error: any) {
      console.error('Error fetching photos from Firestore:', error);
      // Re-throw a more generic error to the client
      throw new Error(`Failed to retrieve photos. Please ensure the server has the 'Cloud Datastore User' IAM role. Original error: ${error.message}`);
    }
  }
);

    