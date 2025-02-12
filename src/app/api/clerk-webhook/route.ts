import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import userModel from "@/models/user.model";

export async function POST(req: Request) {
  const payload = await req.json();
  const header = await headers(); // ✅ Await the headers

  // Verify webhook signature
  const signatureHeader =
    header.get("X-Svix-Signature") || header.get("svix-signature") || "";
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const verified = wh.verify(payload, {
    "svix-id": header.get("svix-id")!,
    "svix-timestamp": header.get("svix-timestamp")!,
    "svix-signature": signatureHeader,
  });

  if (!verified) return new Response("Invalid signature", { status: 401 });

  // Handle user creation/update
  if (payload.type === "user.created" || payload.type === "user.updated") {
    await userModel.findOneAndUpdate(
      { clerkUserId: payload.data.id }, // Find only by Clerk ID
      {
        $set: {
          username: payload.data.username,
          email: payload.data.email,
        },
      },
      { upsert: true, new: true }
    );
  }

  return NextResponse.json({ success: true });
}
