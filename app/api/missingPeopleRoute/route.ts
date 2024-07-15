import connectMongoDB from "@/database/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/library/getSession";
import { MissingPerson } from "@/library/schema";

export async function GET(req) {
  try {
    const session = await getSession();
    const userId = session?.user?.id;
    await connectMongoDB();

    // if (!image1) {
    //   return NextResponse.json({ message: "No image found for user" });
    // }

    const image1 = await MissingPerson.findOne({ userId: userId });
    const arrImg = await MissingPerson.aggregate([
      { $match: { userId: { $ne: userId } } },
      // { $project: { imageUrl: 1, _id: 0 } },
    ]);

    return NextResponse.json({ image1, arrImg }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Api call e error", error },
      { status: 500 }
    );
  }
}
