import { PrismaClient } from "@prisma/client";

const Statistics = async () => {
  const prisma = new PrismaClient();
  const total = await prisma.missingPerson.findMany();
  const found = await prisma.missingPerson.findMany({
    where: { missing: "false" },
  });
  const missing = await prisma.missingPerson.findMany({
    where: { missing: "true" },
  });
  return (
    <div className="flex justify-center flex-col items-center my-24">
      <h1 className="text-4xl text-center my-16 font-bold uppercase">
        Statistics
      </h1>
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="w-72 h-44 bg-gray-800 flex flex-col justify-center items-center  p-3 rounded-md shadow-lg shadow-[rgb(156,39,176)]/60">
          <h1 className="text-3xl font-bold uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)]">
            Total Case
          </h1>
          <h1 className="font-bold text-xl text-gray-400">
            {total?.length < 10 && "0"}
            {total?.length}
          </h1>
        </div>

        <div className="w-72 h-44 bg-gray-800 flex flex-col justify-center items-center  p-3 rounded-md shadow-lg shadow-[rgb(156,39,176)]/60">
          <h1 className="text-3xl font-bold uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)]">
            Missing
          </h1>
          <h1 className="font-bold text-xl text-gray-400">
            {missing?.length < 10 && "0"}
            {missing?.length}
          </h1>
        </div>

        <div className="w-72 h-44 bg-gray-800 flex flex-col justify-center items-center  p-3 rounded-md shadow-lg shadow-[rgb(156,39,176)]/60">
          <h1 className="text-3xl font-bold uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)]">
            Found
          </h1>
          <h1 className="font-bold text-xl text-gray-400">
            {found?.length < 10 && "0"}
            {found?.length/2}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
