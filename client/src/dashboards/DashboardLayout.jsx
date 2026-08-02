import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "../lib/api";
import Sidebar from "./Sidebar";
import { useView } from "@/store";

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

  const { setView } = useView();

  const handleSelectSubject = (id) => {
    setView("dashboard");
    onSelectSubject(id);
  };

  return (
    <div className="flex min-h-screen bg-paper font-inter">
      <Sidebar
        subjects={subjects}
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={handleSelectSubject}
        topItem={topItem}
        onLogout={onLogout}
      />
      <main className="flex-1 p-10 px-12 flex flex-col relative" id="main-content">
        {children}
        <div id="modal-root" />
      </main>
    </div>
  );
}

export default DashboardLayout;
