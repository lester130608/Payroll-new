import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg">
          Welcome, <span className="font-semibold">{session.user?.email}</span>
        </p>
      </div>
    </div>
  );
}
