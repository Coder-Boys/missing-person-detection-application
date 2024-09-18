"use server";
import { saveFile } from "./saveFile";
import { getSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
export const postData = async (formData: FormData) => {
  const session = await getSession();
  const name = formData.get("name") as string;
  const age = formData.get("age") as string;
  const location = formData.get("location") as string;
  const contact = formData.get("contact") as string;
  const textarea = formData.get("textarea") as string;
  const imageUrl = formData.get("image") as File;
  const preset = "MissingPersonImage" as string;
  const url = await saveFile(imageUrl, preset);
  const prisma = new PrismaClient();
  if (!name || !age || !location || !contact) {
    throw new Error("Please fill all fields");
  }

  const userId = session?.user.id;
  await prisma.missingPerson.create({
    data: {
      name,
      age,
      contact,
      location,
      imageUrl: url,
      textarea: textarea,
      userId,
    },
  });

  console.log(`Missing Person data created successfully 🥂`);

  revalidatePath("/feed");
};
