import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import UserPreferences from '@/models/userModel';

export async function POST(req: Request) {
  const payload = await req.json();
  const header = await headers();

  // Verify webhook signature
  
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const verified = wh.verify(payload, header.get('svix-id')!, header.get('svix-timestamp')!, header.get('svix-signature')!);

  if (!verified) return new Response('Invalid signature', { status: 401 });

  // Handle user creation/update
  if (payload.type === 'user.created' || payload.type === 'user.updated') {
    await UserPreferences.findOneAndUpdate(
      { clerkUserId: payload.data.id },
      { $setOnInsert: { clerkUserId: payload.data.id } }, // Create if doesn't exist
      { upsert: true, new: true }
    );
  }

  return NextResponse.json({ success: true });
}