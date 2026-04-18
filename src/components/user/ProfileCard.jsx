import useAuth from "../../hooks/useAuth";

export default function ProfileCard() {
  const { user } = useAuth();
  return (
    <div className="surface p-6">
      <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <p>Name: {user?.name || "Guest User"}</p>
        <p>Email: {user?.email || "guest@example.com"}</p>
        <p>Status: {user ? "Logged in" : "Guest"}</p>
      </div>
    </div>
  );
}
