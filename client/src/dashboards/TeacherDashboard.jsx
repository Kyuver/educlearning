import { useState, useEffect } from "react";
import { Home, User } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useView, useShowModal, useSection } from "@store";
import TeacherProfileView from "./views/teacher/TeacherProfileView";
import TeacherSubjectsView from "./views/teacher/TeacherSubjectsView";
import TeacherTopicQuizzesView from "./views/teacher/TeacherTopicQuizzesView";
import AddQuizFormModal from "./views/shared/AddQuizFormModal";
import TeacherAddTopicModal from "./views/teacher/TeacherAddTopicModal";
import TeacherEditTopicModal from "./views/teacher/TeacherEditTopicModal";
import TeacherDeleteTopicModal from "./views/teacher/TeacherDeleteTopicModal";
import ConfirmLogoutModal from "../compontents/ConfirmLogoutModal";
import { fetchSubjects } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

function TeacherDashboard() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  const { view, setView } = useView();
  const { modal, setModal, closeModal } = useShowModal();
  const {setSection} = useSection()

  useEffect(() => {
    setSection("approved");
  }, [setSection]);

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  const topItem = (
    <>
      <div
        className={
          "flex items-center gap-2.5 px-5 py-3 text-sm cursor-pointer border-l-3 " +
          (view === "dashboard" && !selectedSubjectId
            ? "bg-white/14 text-white border-gold"
            : "text-white/85 border-transparent hover:bg-white/6")
        }
        onClick={() => {
          setView("dashboard");
          setActiveTopic(null);
          setSelectedSubjectId(null);
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
        onClick={() => {
          setView("profile");
          setSelectedSubjectId(null);
        }}
      >
        <User size={16} /> Profile
      </div>
    </>
  );

  const handleSelectSubject = (id) => {
    setView("dashboard");
    setActiveTopic(null);
    setSelectedSubjectId(id);
  };

  console.log("id of the subject section from teacher dashboard", selectedSubjectId)
  return (
    <DashboardLayout
      subjects={subjects}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={handleSelectSubject}
      topItem={topItem}
      onLogout={() => setModal("ConfirmLogoutModal")}
    >
      {view === "profile" && <TeacherProfileView />}
      {view === "dashboard" && activeTopic && <TeacherTopicQuizzesView topic={activeTopic} onBack={() => setActiveTopic(null)} />}
      {view === "dashboard" && !activeTopic && <TeacherSubjectsView selectedSubjectId={selectedSubjectId} onTopicClick={(topic) => { setActiveTopic(topic); }} />}
      {modal === "AddQuizFormModal" && <AddQuizFormModal topic={activeTopic} />}

      {modal === "TeacherAddTopicModal" && <TeacherAddTopicModal subjectId={selectedSubjectId} />}
      {modal === "TeacherEditTopicModal" && <TeacherEditTopicModal />}

      {modal === "TeacherDeleteTopicModal" && <TeacherDeleteTopicModal />}

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

export default TeacherDashboard;
