import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "../lib/api";
import Sidebar from "./Sidebar";

function DashboardLayout({
  selectedSubjectId,
  onSelectSubject,
  topItem,
  onLogout,
  children,
}) {
  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  return (
    <div className="flex min-h-screen bg-paper font-inter">
      <Sidebar
        subjects={subjects}
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={onSelectSubject}
        topItem={topItem}
        onLogout={onLogout}
      />
      <main className="flex-1 p-10 px-12 flex flex-col">{children}</main>
    </div>
  );
}
export default DashboardLayout;
