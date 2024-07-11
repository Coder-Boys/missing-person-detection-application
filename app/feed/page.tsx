import AddMissingForm from "@/components/AddMissingForm";
import MissingPerson from "@/lib/MissingPersonSchema";
import connectMongoDB from "@/lib/mongodb";
import Image from "next/image";
import React from "react";

const Feed = async () => {
  await connectMongoDB();

  const persons = await MissingPerson.find({});
  // const persons = await MissingPerson.find({missing:true});
  // const persons = await MissingPerson.find({missing:false});

  return (
    <div className="">
      <AddMissingForm />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5">

        {persons.map((person) => (
          <div
            key={person}
            className="card bg-gray-900 w-96 shadow-lg my-5  shadow-[rgb(156,39,176)]/60"
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
              <h2 className="card-title">Name: </h2>
              <p>Age: </p>
              <p>Height: </p>
              <p>Gender: </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
