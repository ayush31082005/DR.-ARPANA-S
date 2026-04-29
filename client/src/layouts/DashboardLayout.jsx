import MainLayout from "./MainLayout";

export default function DashboardLayout({ children }) {
  return (
    <MainLayout>
      <section className="section-space">
        <div className="container-padded">{children}</div>
      </section>
    </MainLayout>
  );
}
