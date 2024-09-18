import { getSession } from "@/lib/getSession";

import { PrismaClient } from "@prisma/client";

import Image from "next/image";
import React from "react";

const MyData = async () => {
  const session = await getSession();
  const id = session?.user?.id;
  const prisma = new PrismaClient();
  const person = await prisma.missingPerson.findFirst({
    where: { userId: id },
  });

  return (
    <div>
      <div>
        <p className="my-5 ms-4 text-red-500 text-2xl font-bold flex gap-2">
          The Missing Person{" "}
        </p>
        <p className="text-gray-400 text-2xl font-bold ms-4">
          Here is the person
        </p>
      </div>
      <div className=" bg-gray-900 rounded-xl shadow-lg my-5 pb-3  shadow-[rgb(156,39,176)]/60">
        <div></div>
        <figure className="px-10 pt-10 flex justify-center items-center">
          <Image
            src={person?.imageUrl}
            alt="Shoes"
            className="rounded-xl object-cover h-[400px] hover:scale-110 hover:duration-200 hover:ease-in-out"
            width={450}
            height={350}
          />
        </figure>
        <div className="my-8 text-gray-400 mx-10 space-y-1">
          <h2 className="font-bold text-4xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] my-5">
            {person?.name}
          </h2>

          <h2 className="">Age: {person?.age} years</h2>
          <h2 className="">Location: {person?.location}</h2>
          <h2 className="">Contact Info: {person?.contact}</h2>
          <h2 className="">Details: {person?.textarea}</h2>
        </div>
      </div>
    </div>
  );
};

export default MyData;
