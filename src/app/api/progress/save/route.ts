import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const data = await request.json();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db('echo-save-games');
    
    const result = await db.collection('progress').updateOne(
      {
        gameId: data.gameId,
        userId: data.userId,
      },
      {
        $set: {
          score: data.score,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    );
  }
} 