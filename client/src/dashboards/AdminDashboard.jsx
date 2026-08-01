import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useShowModal, useView, useSection, MODAL } from "../store/useComponent";
import AdminHomeView from "./views/admin/AdminHomeView";
import AdminSubjectTopicsView from "./views/admin/AdminSubjectTopicsView";
import AdminInviteTeacherModal from "./views/admin/AdminInviteTeacherModal";
import AdminTopicReviewModal from "./views/admin/AdminTopicReviewModal";
import AddTopicModal from "./views/shared/AddTopicModal";
import ConfirmLogoutModal from "../compontents/ConfirmLogoutModal";

function AdminDashboard() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const view = useView((s) => s.view);
  const setView = useView((s) => s.setView);
  const setSection = useSection((s) => s.setSection);
  const modal = useShowModal((s) => s.modal);
  const setModal = useShowModal((s) => s.setModal);

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
      }}
    >
      <Home size={16} /> Admin Dashboard
    </div>
  );

  return (
    <DashboardLayout
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={setSelectedSubjectId}
      topItem={topItem}
      onLogout={() => setModal(MODAL.CONFIRM_LOGOUT)}
    >
      {view === "dashboard" && selectedSubjectId && (
        <AdminSubjectTopicsView selectedSubjectId={selectedSubjectId} />
      )}
      {view === "dashboard" && !selectedSubjectId && <AdminHomeView />}
      {modal === MODAL.ADMIN_INVITE_TEACHER && <AdminInviteTeacherModal />}
      {modal === MODAL.ADMIN_TOPIC_REVIEW && <AdminTopicReviewModal />}
      {modal === MODAL.ADMIN_ADD_TOPIC && <AddTopicModal />}
      <ConfirmLogoutModal
        open={modal === MODAL.CONFIRM_LOGOUT}
        onCancel={() => setModal(null)}
        onConfirm={() => {
          setModal(null);
          window.location.href = "/";
        }}
      />
    </DashboardLayout>
  );
}

export default AdminDashboard;
