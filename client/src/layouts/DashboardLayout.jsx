import MainLayout from "./MainLayout";

export default function DashboardLayout({ children }) {
  return (
    <MainLayout showFooter={false}>
      <section className="pb-14 md:pb-20">
        <div className="w-full">{children}</div>
      </section>
    </MainLayout>
  );
}
