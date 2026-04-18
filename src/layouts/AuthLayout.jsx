export default function AuthLayout({ children }) {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-100 via-teal-50 to-sky-50 p-4">
      <div className="w-full max-w-xl">{children}</div>
    </main>
  );
}
