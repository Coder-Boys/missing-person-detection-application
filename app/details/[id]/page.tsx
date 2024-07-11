import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MissingPerson from "@/lib/MissingPersonSchema";
import connectMongoDB from "@/lib/mongodb";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";


const Details = async ({ params }) => {
  await connectMongoDB();
  const id = params.id;
  const person = await MissingPerson.findOne({ _id: id });
  // const persons = await MissingPerson.find({missing:true});
  // const persons = await MissingPerson.find({missing:false});

  return (
    <div className="flex justify-center items-center mx-3">
      <div
        key={person}
        className=" bg-gray-900 w-[800px] h-full rounded-xl shadow-lg my-5  shadow-[rgb(156,39,176)]/60"
      >
        <figure className="px-10 pt-10">
          <Image
            src={person.imageUrl}
            alt="Shoes"
            className="rounded-xl object-cover w-full h-[400px] hover:scale-110 hover:duration-200 hover:ease-in-out"
            width={450}
            height={350}
          />
        </figure>
        <div className="my-5 mx-10 space-y-1">
          <h2 className="font-bold text-4xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] my-5">{person.name}</h2>
          <h2 className="">Age: {person.age}</h2>
          <h2 className="">Location: {person.location}</h2>
          <h2 className="">Contact Info: {person.contact}</h2>
          <h2 className="">Details: {person.textarea}</h2>
        </div>
      </div>
    </div>
  );
};

export default Details;
