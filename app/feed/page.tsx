import AddMissingForm from "@/components/AddMissingForm";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import MissingPerson from "@/lib/MissingPersonSchema";
import connectMongoDB from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Feed = async () => {
  await connectMongoDB();

  const persons = await MissingPerson.find({});
 

  return (
    <div className="">
      <AddMissingForm />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 place-content-center">

        {persons.map((person) => (
         <Card key={person._id} person={person}/>
        ))}
      </div>
    </div>
  );
};

export default Feed;
