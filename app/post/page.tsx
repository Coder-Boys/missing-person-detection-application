import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/getSession";
import MissingPerson from "@/lib/MissingPersonSchema";
import connectMongoDB from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Post = async () => {
  const session = await getSession();
  const id = session?.user?.id;
  await connectMongoDB();
  const persons = await MissingPerson.find({ userId: id });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5">
      {persons.map((person) => (
        <div
          key={person._id}
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
          <div className="card-body items-center text-center">
            <h2 className="font-bold my-3">{person.name}</h2>
          </div>{" "}
          <div className="flex justify-between mx-4">
            <Link href={`/details/${person._id}`}>
              <Button className="bg-my-gradient ">Details</Button>
            </Link>
            <form
              action={async () => {
                "use server";
                await MissingPerson.findByIdAndDelete(person._id);
              }}
            >
              <Button className=" mb-4 bg-red-500 hover:bg-red-600 text-gray-300 rounded focus:outline-none">
                Delete
              </Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
