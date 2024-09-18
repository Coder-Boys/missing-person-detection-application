"use server";

import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { PrismaClient } from "@prisma/client";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }

  redirect("/");
};

const register = async (formData: FormData) => {
  const prisma = new PrismaClient();

  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all fields");
  }

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: { firstName, lastName, email, password: hashedPassword },
  });
  console.log(`User created successfully 🥂`);
  redirect("/auth/signin");
};

const fetchAllUsers = async () => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany();
  return users;
};

export { register, login, fetchAllUsers };
