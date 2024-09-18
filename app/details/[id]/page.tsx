import { Badge } from "@/components/ui/badge";

import { PrismaClient } from "@prisma/client";

import Image from "next/image";
import React from "react";

const Details = async ({ params }) => {
  const prisma = new PrismaClient();

  const id = params.id;
  const person = await prisma.missingPerson.findUnique({ where: { id } });

  return (
    <div className="flex justify-center items-center mx-4">
      <div
        key={person.id}
        className=" bg-gray-900 w-[800px] h-full rounded-xl shadow-lg my-5  shadow-[rgb(156,39,176)]/60"
      >
        <figure className="px-10 pt-10 flex justify-center items-center">
          <Image
            src={person.imageUrl}
            alt="Shoes"
            className="rounded-xl object-cover h-[400px] hover:scale-110 hover:duration-200 hover:ease-in-out"
            width={450}
            height={350}
          />
        </figure>
        <div className="my-8 text-gray-400 mx-10 space-y-1">
          <h2 className="font-bold text-4xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] my-5">
            {person.name}
          </h2>

          <h2 className="">Age: {person.age} years</h2>
          <h2 className="">Location: {person.location}</h2>
          <h2 className="">Contact Info: <Badge className="bg-red-400">Hidden</Badge></h2>
          <h1
            className={`font-bold text-lg ${
              person.missing === "true" ? "text-red-400" : "text-green-500"
            }`}
          >
            {" "}
            <span className="text-gray-400">Status:</span>{" "}
            <Badge
              className={`${
                person.missing === "false" ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {" "}
              {person.missing === "true" ? "Missing" : "Found"}
            </Badge>
          </h1>
          <h2 className="">Details: {person.textarea}</h2>
        </div>
      </div>
    </div>
  );
};

export default Details;
