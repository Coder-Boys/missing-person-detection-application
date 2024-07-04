import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) return redirect("/");
  return <div>Dashboard</div>;
};

export default Dashboard;
