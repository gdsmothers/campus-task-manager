import { TasksPanel } from "../../components/TasksPanel";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const search = searchParams?.search ?? "";

  // Pass search text down to client component
  return <TasksPanel initialSearch={search} />;
}