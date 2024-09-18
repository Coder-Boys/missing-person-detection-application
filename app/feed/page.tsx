import AddMissingForm from "@/components/AddMissingForm";
import Card from "@/components/Card";
import { getSession } from "@/lib/getSession";
import { PrismaClient } from "@prisma/client";

const Feed = async () => {
  const prisma = new PrismaClient();

  const persons = await prisma.missingPerson.findMany();
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
          <Card key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
