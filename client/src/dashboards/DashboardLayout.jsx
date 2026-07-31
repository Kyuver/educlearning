import Sidebar from "./Sidebar";

function DashboardLayout({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  topItem,
  children,
}) {
  return (
    <div className="flex min-h-screen bg-paper font-inter">
      <Sidebar
        subjects={subjects}
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={onSelectSubject}
        topItem={topItem}
      />
      <main className="flex-1 p-10 px-12 flex flex-col">{children}</main>
    </div>
  );
}
export default DashboardLayout;
