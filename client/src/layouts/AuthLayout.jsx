import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Topbar from "../components/common/Topbar";

export default function AuthLayout({ children }) {
  return (
    <div className="theme-green-page">
      <Topbar />
      <Navbar />
      <main className="bg-gradient-to-b from-[#dff8bf] via-[#eefddb] to-[#d5f6a8] pt-[72px] sm:pt-20 xl:pt-28">
        <div className="grid min-h-[calc(100vh-72px)] place-items-center p-4 sm:min-h-[calc(100vh-160px)] sm:p-6">
          <div className="w-full max-w-xl">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
