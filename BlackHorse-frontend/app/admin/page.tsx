import { PageTitle } from "../components/PageTitle";
import { AdminDashboard } from "./AdminDashboard";

export default function AdminPage() {
  return (
    <>
      <PageTitle title="Admin Dashboard" copy="Manage events, open mic sessions, menu, orders, reservations, media, and news." />
      <section className="section">
        <AdminDashboard />
      </section>
    </>
  );
}
