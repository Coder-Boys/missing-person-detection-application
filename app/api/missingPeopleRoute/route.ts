// import connectMongoDB from "@/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/getSession";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const session = await getSession();
    const userId = session?.user?.id;

    const image1 = await prisma.missingPerson.findFirst({ where: { userId } });

    const arrImg = await prisma.missingPerson.findMany({
      where: {
        userId: {
          not: userId,
        },
      },
    });

    return NextResponse.json({ image1, arrImg }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Api call e error", error },
      { status: 500 }
    );
  }
}
