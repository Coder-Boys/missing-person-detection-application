import { fetchAllUsers } from "@/action/user";
import ButtonX from "@/components/ButtonX";
import { getSession } from "@/lib/getSession";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

const Settings = async () => {
  const prisma = new PrismaClient();

  const session = await getSession();
  const user: any = session?.user;
  if (!user) return redirect("/auth/signin");

  if (user?.role !== "admin") return notFound();

  const allUsers = await fetchAllUsers();

  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-4">
      <h1 className="text-xl font-bold mb-4 text-center">User List</h1>
      <table className="w-1/3 rounded shadow">
        <thead>
          <tr className=" text-violet-500 text-left">
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {allUsers?.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.lastName}</td>
              <td className="p-2">
                <form
                  action={async () => {
                    "use server";
                    await prisma.user.delete({ where: { id: user.id } });
                    revalidatePath("/private/settings");
                  }}
                >
                  <ButtonX>Delete</ButtonX>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
