import { fetchAllUsers } from "@/action/user";
import ButtonX from "@/components/ButtonX";
import { getSession } from "@/library/getSession";
import { User } from "@/library/schema";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await getSession();
  const user: any = session?.user;
  if (!user) return redirect("/auth/signin");

  if (user?.role !== "admin") return redirect("/private/settings");

  const allUsers = await fetchAllUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <table className="w-full rounded shadow">
        <thead>
          <tr className=" text-violet-500 text-left">
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {allUsers?.map((user) => (
            <tr key={user._id}>
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.lastName}</td>
              <td className="p-2">
                <form
                  action={async () => {
                    "use server";
                    await User.findByIdAndDelete(user._id);
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
