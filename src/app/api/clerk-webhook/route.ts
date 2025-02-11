import {Webhook} from "svix"
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import userModel from "@/models/user.model";

export async function POST(req: Request) {
  const payload = await req.json();
  const header = await headers();

  // Verify webhook signature
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const signatureHeader = header.get('X-Svix-Signature') || '';
  const verified = wh.verify(signatureHeader, payload);

  if (!verified) return new Response("Invalid signature", { status: 401 });

  // Handle user creation/update
  if (payload.type === "user.created" || payload.type === "user.updated") {
    await userModel.findOneAndUpdate(
      { clerkUserId: payload.data.id, username: payload.data.username, email: payload.data.email },
      { $setOnInsert: { clerkUserId: payload.data.id, username: payload.data.username, email: payload.data.emai } }, // Create if doesn't exist
      { upsert: true, new: true }
    );
  }

  return NextResponse.json({ success: true });
}
