import MissingPerson from "@/lib/MissingPersonSchema";
import connectMongoDB from "@/lib/mongodb";
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
