import AddMissingForm from "@/components/AddMissingForm";
import Card from "@/components/Card";
import connectMongoDB from "@/database/mongodb";
import { getSession } from "@/lib/getSession";
import { MissingPerson } from "@/library/schema";

const Feed = async () => {
  await connectMongoDB();

  const persons = await MissingPerson.find({});
  const session = await getSession();

  return (
    <div className="">
      {session ? (
        <AddMissingForm />
      ) : (
        <p className="mt-4 text-center text-red-600 text-xl text-mono font-bold">
          Please Log in to add missing person
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 place-content-center">
        {persons.map((person) => (
          <Card key={person._id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
