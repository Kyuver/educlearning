import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useShowModal, useView, useSection } from "@store";
import AdminHomeView from "./views/admin/AdminHomeView";
import AdminSubjectTopicsView from "./views/admin/AdminSubjectTopicsView";
import AdminTopicDetailView from "./views/admin/AdminTopicDetailView";
import AdminInviteTeacherModal from "./views/admin/AdminInviteTeacherModal";
import AdminTopicReviewModal from "./views/admin/AdminTopicReviewModal";
import AddTopicModal from "./views/shared/AddTopicModal";
import ConfirmLogoutModal from "../compontents/ConfirmLogoutModal";

function AdminDashboard() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { view, setView } = useView();
  const { modal, setModal, closeModal } = useShowModal();
  const setSection = useSection((s) => s.setSection);

  useEffect(() => {
    setSection("default");
  }, [setSection]);

  const topItem = (
    <div
      className={
        "flex items-center gap-2.5 px-5 py-3 text-sm cursor-pointer border-l-3 " +
        (view === "dashboard" && !selectedSubjectId
          ? "bg-white/14 text-white border-gold"
          : "text-white/85 border-transparent hover:bg-white/6")
      }
      onClick={() => {
        setView("dashboard");
        setSelectedSubjectId(null);
        setSelectedTopic(null);
      }}
    >
      <Home size={16} /> Admin Dashboard
    </div>
  );

  return (
    <DashboardLayout
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={(id) => {
        setSelectedTopic(null);
        setSelectedSubjectId(id);
      }}
      topItem={topItem}
      onLogout={() => setModal("ConfirmLogoutModal")}
    >
      {view === "dashboard" && selectedSubjectId && !selectedTopic && (
        <AdminSubjectTopicsView
          selectedSubjectId={selectedSubjectId}
          onTopicClick={setSelectedTopic}
        />
      )}
      {view === "dashboard" && selectedSubjectId && selectedTopic && (
        <AdminTopicDetailView
          topic={selectedTopic}
          onBack={() => setSelectedTopic(null)}
        />
      )}
      {view === "dashboard" && !selectedSubjectId && <AdminHomeView />}
      {modal === "AdminInviteTeacherModal" && <AdminInviteTeacherModal />}
      {modal === "AdminTopicReviewModal" && <AdminTopicReviewModal />}
      {modal === "AdminAddTopicModal" && <AddTopicModal />}
      <ConfirmLogoutModal
        open={modal === "ConfirmLogoutModal"}
        onCancel={() => closeModal()}
        onConfirm={() => {
          closeModal();
          window.location.href = "/";
        }}
      />
    </DashboardLayout>
  );
}

export default AdminDashboard;
