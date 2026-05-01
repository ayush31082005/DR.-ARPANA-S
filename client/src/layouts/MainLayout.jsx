import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Topbar from "../components/common/Topbar";

export default function MainLayout({ children, showFooter = true }) {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="pt-[72px] sm:pt-20 xl:pt-28">{children}</main>
      {showFooter ? <Footer /> : null}
    </>
  );
}
