import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const messages = await db.message.findMany();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const message = await db.message.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message,
      date: new Date(),
      status: "Unread",
    },
  });
  return NextResponse.json(message);
}
