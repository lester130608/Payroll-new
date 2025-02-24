import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Payroll System</h1>
      <div>
        {session?.user ? (
          <span className="text-gray-600 font-semibold">
            Logged in as: {session.user.email} ({session.user.role})
          </span>
        ) : (
          <span className="text-gray-500">Not logged in</span>
        )}
      </div>
    </nav>
  );
}