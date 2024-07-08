import AddMissingForm from "@/components/AddMissingForm";
import MissingPerson from "@/lib/MissingPersonSchema";
import connectMongoDB from "@/lib/mongodb";
import React from "react";

const Feed = async () => {
  await connectMongoDB();
  const persons = await MissingPerson.find({});
  return (
    <div>
      {persons.map((person) => (
        <li key={person._id}>{person.gender}</li>
      ))}
      <AddMissingForm />
    </div>
  );
};

export default Feed;
