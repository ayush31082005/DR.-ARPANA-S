import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Topbar from "../components/common/Topbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="pt-[72px] sm:pt-0">{children}</main>
      <Footer />
    </>
  );
}
