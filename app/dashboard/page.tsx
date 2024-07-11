"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const session = useSession();

  console.log(session);
  // if (!user) return redirect("/");
  return <div>Dashboard : {session?.data?.user?.id}</div>;
};

export default Dashboard;
