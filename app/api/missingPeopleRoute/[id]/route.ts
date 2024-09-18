import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }) {
  const prisma = new PrismaClient();

  const { id } = params;
  const { missing } = await req.json();
  console.log("server roter id", id);
  await prisma.missingPerson.update({
    where: {
      id: id,
    },
    data: {
      missing: missing,
    },
  });
  return NextResponse.json({ message: "post Updated" }, { status: 200 });
}
