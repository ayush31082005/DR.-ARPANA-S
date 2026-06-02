import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Topbar from "../components/common/Topbar";

export default function MainLayout({ children, showFooter = true }) {
  return (
    <div className="theme-green-page overflow-x-hidden">
      <Topbar />
      <Navbar />
      <main className="overflow-x-hidden bg-gradient-to-b from-[#fff7fa] via-[#fdeef5] to-[#f8dfe9] pt-[72px] sm:pt-20 xl:pt-28">
        {children}
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  );
}

