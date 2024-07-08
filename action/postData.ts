"use server";
import { getSession } from "@/lib/getSession";
import MissingPerson from "@/lib/MissingPersonSchema";
import connectMongoDB from "@/lib/mongodb";
import { redirect } from "next/navigation";

export const postData = async (formData: FormData) => {
  const session = await getSession();
  const name = formData.get("name") as string;
  const age = formData.get("age") as string;
  const height = formData.get("height") as string;
  const gender = formData.get("gender") as string;
  const image = formData.get("imageUrl") as string;
  console.log(image)

  if (!name || !age || !height || !gender) {
    throw new Error("Please fill all fields");
  }

  await connectMongoDB();

  // existing user

  const userId = session?.user.id;

  await MissingPerson.create({ name, age, gender, height, userId });
  console.log(`Missing Person data created successfully 🥂`);
  redirect("/feed");
};
