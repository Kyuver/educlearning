import { useState } from "react";
import { Home, User } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useView } from "../store/useComponent";
import StudentProfileView from "./views/student/StudentProfileView";
import StudentHomeView from "./views/student/StudentHomeView";
import StudentSubjectTopicsView from "./views/student/StudentSubjectTopicsView";
import StudentTopicDetailView from "./views/student/StudentTopicDetailView";
import StudentQuizView from "./views/student/StudentQuizView";
import StudentQuizResultView from "./views/student/StudentQuizResultView";

function StudentDashboard() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [score, setScore] = useState(null);
  const view = useView((s) => s.view);
  const setView = useView((s) => s.setView);

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
          setSelectedSubjectId(null);
          setSelectedTopicId(null);
          setTakingQuiz(false);
          setScore(null);
        }}
      >
        <Home size={16} /> Student Dashboard
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
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={setSelectedSubjectId}
      topItem={topItem}
      onLogout={() => (window.location.href = "/")}
    >
      {view === "profile" && <StudentProfileView />}
      {view === "dashboard" && !selectedSubjectId && <StudentHomeView />}
      {view === "dashboard" && selectedSubjectId && !selectedTopicId && (
        <StudentSubjectTopicsView />
      )}
      {view === "dashboard" && selectedTopicId && !takingQuiz && (
        <StudentTopicDetailView />
      )}
      {view === "dashboard" && selectedTopicId && takingQuiz && score === null && (
        <StudentQuizView />
      )}
      {view === "dashboard" && selectedTopicId && takingQuiz && score !== null && (
        <StudentQuizResultView />
      )}
    </DashboardLayout>
  );
}

export default StudentDashboard;
