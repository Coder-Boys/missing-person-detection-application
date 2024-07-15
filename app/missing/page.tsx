import AddMissingForm from "@/components/AddMissingForm";
import Card from "@/components/Card";
import connectMongoDB from "@/database/mongodb";
import { MissingPerson } from "@/library/schema";

const Missing = async () => {
  await connectMongoDB();

  const persons = await MissingPerson.find({ missing: true });
  // const persons = await MissingPerson.find({missing:false});
  return (
    <div>
      <AddMissingForm />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 place-content-center">
        {persons.map((person) => (
          <Card key={person._id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Missing;
