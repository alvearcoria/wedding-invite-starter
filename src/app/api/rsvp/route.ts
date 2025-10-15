import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { rsvpSchema } from '@/types/rsvp';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body._hp) {
      // It's likely a bot, return a generic success response
      return NextResponse.json({ success: true, message: '¡Gracias por tu confirmación! Estamos ansiosos por verte.' });
    }

    const validatedData = rsvpSchema.parse(body);

    const { slug, ...guestData } = validatedData;
    
    const db = adminDb();
    const guestRef = db.collection('invitations').doc(slug).collection('guests').doc();
    
    await guestRef.set({
      ...guestData,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      source: 'website',
    });

    return NextResponse.json({ success: true, message: '¡Gracias por tu confirmación! Estamos ansiosos por verte.' }, { status: 200 });
  } catch (error) {
    console.error('RSVP submission error:', error);
    
    // Check for Zod validation error
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json({ success: false, error: 'Invalid data provided.', details: (error as any).issues }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({ success: false, error: 'An internal server error occurred.' }, { status: 500 });
  }
}
