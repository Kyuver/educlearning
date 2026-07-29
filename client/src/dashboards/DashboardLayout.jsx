import Sidebar from "./Sidebar";
function DashboardLayout({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  topItem,
  children,
}) {
  return (
    <div className="dsb-layout">
      {" "}
      <Sidebar
        subjects={subjects}
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={onSelectSubject}
        topItem={topItem}
      />{" "}
      <main className="dsb-main">{children}</main>{" "}
    </div>
  );
}
export default DashboardLayout;