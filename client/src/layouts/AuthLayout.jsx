import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Topbar from "../components/common/Topbar";

export default function AuthLayout({ children }) {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="bg-gradient-to-br from-slate-100 via-teal-50 to-sky-50 pt-[72px] sm:pt-0">
        <div className="grid min-h-[calc(100vh-72px)] place-items-center p-4 sm:min-h-[calc(100vh-160px)]">
          <div className="w-full max-w-xl">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
