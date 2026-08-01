import { useState } from "react";
import { Home, User } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useShowModal, useView, MODAL } from "../store/useComponent";
import TeacherProfileView from "./views/teacher/TeacherProfileView";
import TeacherSubjectsView from "./views/teacher/TeacherSubjectsView";
import TeacherTopicQuizzesView from "./views/teacher/TeacherTopicQuizzesView";
import AddQuizFormModal from "./views/shared/AddQuizFormModal";
import AddTopicModal from "./views/shared/AddTopicModal";
import TeacherEditTopicModal from "./views/teacher/TeacherEditTopicModal";
import TeacherDeleteTopicModal from "./views/teacher/TeacherDeleteTopicModal";
import ConfirmLogoutModal from "../compontents/ConfirmLogoutModal";

function TeacherDashboard() {
  const [activeTopic, setActiveTopic] = useState(null);
  const view = useView((s) => s.view);
  const setView = useView((s) => s.setView);
  const modal = useShowModal((s) => s.modal);
  const setModal = useShowModal((s) => s.setModal);

  const topItem = (
    <>
      <div
        className={
          "flex items-center gap-2.5 px-5 py-3 text-sm cursor-pointer border-l-3 " +
          (view === "dashboard" && !activeTopic
            ? "bg-white/14 text-white border-gold"
            : "text-white/85 border-transparent hover:bg-white/6")
        }
        onClick={() => {
          setView("dashboard");
          setActiveTopic(null);
        }}
      >
        <Home size={16} /> Teacher Dashboard
      </div>
      <div
        className={
          "flex items-center gap-2.5 px-5 py-3 text-sm cursor-pointer border-l-3 " +
          (view === "profile"
            ? "bg-white/14 text-white border-gold"
            : "text-white/85 border-transparent hover:bg-white/6")
        }
        onClick={() => setView("profile")}
      >
        <User size={16} /> Profile
      </div>
    </>
  );

  return (
    <DashboardLayout
      subjects={[]}
      selectedSubjectId={null}
      onSelectSubject={() => {}}
      topItem={topItem}
      onLogout={() => setModal(MODAL.CONFIRM_LOGOUT)}
    >
      {view === "profile" && <TeacherProfileView />}
      {view === "dashboard" && activeTopic && <TeacherTopicQuizzesView />}
      {view === "dashboard" && !activeTopic && <TeacherSubjectsView />}
      {modal === MODAL.ADD_QUIZ && <AddQuizFormModal />}
      {modal === MODAL.TEACHER_ADD_TOPIC && <AddTopicModal />}
      {modal === MODAL.TEACHER_EDIT_TOPIC && <TeacherEditTopicModal />}
      {modal === MODAL.TEACHER_DELETE_TOPIC && <TeacherDeleteTopicModal />}
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

export default TeacherDashboard;
