import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Card = ({ person }) => {
  return (
    <div>
      <div
        key={person}
        className="text-gray-400 bg-gray-900 w-96 rounded-xl shadow-lg my-5  shadow-[rgb(156,39,176)]/60"
      >
        <figure className="px-10 pt-10">
          <Image
            src={person.imageUrl}
            alt="Shoes"
            className="rounded-xl object-cover h-[300px] hover:scale-110 hover:duration-200 hover:ease-in-out"
            width={450}
            height={350}
          />
        </figure>
        <div className=" mx-3 items-center text-center">
          <div className="flex justify-between my-3 mx-5 px-5">
            <h2 className="font-bold">{person.name}</h2>
            <h1>
              <Badge
                className={`${
                  person.missing === "false" ? "bg-green-400" : "bg-red-400"
                }`}
              >{`${person.missing === "false" ? "Found" : "Missing"}`}</Badge>
            </h1>
          </div>

          <Link href={`/details/${person._id}`}>
            <Button className="bg-my-gradient mb-4">Details</Button>
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default Card;
