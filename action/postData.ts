"use server";
import { getSession } from "@/lib/getSession";
import MissingPerson from "@/lib/MissingPersonSchema";
import connectMongoDB from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { saveFile } from "./saveFile";

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

  if (!name || !age || !location || !contact) {
    throw new Error("Please fill all fields");
  }

  await connectMongoDB();

  // existing user

  const userId = session?.user.id;

  await MissingPerson.create({
    name,
    age,
    contact,
    location,
    imageUrl: url,
    textarea: textarea,
    userId,
  });
  console.log(`Missing Person data created successfully 🥂`);

  redirect("/feed");
};
