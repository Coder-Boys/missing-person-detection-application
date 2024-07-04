import connectMongoDB from "@/lib/mongodb";
import User from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();
  await connectMongoDB();
  await User.create({ firstName, lastName, email, password });

  return NextResponse.json(
    { message: "User successfully created" },
    { status: 200 }
  );
}
