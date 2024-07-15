import connectMongoDB from "@/database/mongodb";
import { MissingPerson } from "@/library/schema";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { missing } = await req.json();
  await connectMongoDB();
  await MissingPerson.findByIdAndUpdate(id, {
    missing,
  });
  return NextResponse.json({ message: "post Updated" }, { status: 200 });
}
