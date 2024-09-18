import AddMissingForm from "@/components/AddMissingForm";
import Card from "@/components/Card";
import { PrismaClient } from "@prisma/client";

const Missing = async () => {
  const prisma = new PrismaClient();

  const persons = await prisma.missingPerson.findMany({
    where: { missing: "true" },
  });

  return (
    <div>
      <AddMissingForm />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 place-content-center">
        {persons.map((person) => (
          <Card key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Missing;
