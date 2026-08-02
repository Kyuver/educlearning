import { useState } from "react";
import { Home, User } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useView, useQuiz } from "@store";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "../lib/api";
import StudentProfileView from "./views/student/StudentProfileView";
import StudentHomeView from "./views/student/StudentHomeView";
import StudentSubjectTopicsView from "./views/student/StudentSubjectTopicsView";
import StudentTopicDetailView from "./views/student/StudentTopicDetailView";
import StudentQuizView from "./views/student/StudentQuizView";
import StudentQuizResultView from "./views/student/StudentQuizResultView";

function StudentDashboard() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [score, setScore] = useState(null);
  const { view, setView } = useView();
  const { currentQuiz, setCurrentQuiz, resetQuiz } = useQuiz();

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  const openTopic = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubjectId(topic.subjectId);
    setScore(null);
    resetQuiz();
  };

  const resetToDashboard = () => {
    setSelectedSubjectId(null);
    setSelectedTopic(null);
    setScore(null);
    resetQuiz();
  };

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
          resetToDashboard();
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
        onClick={() => {
          setView("profile");
          resetToDashboard();
        }}
      >
        <User size={16} /> Profile
      </div>
    </>
  );

  return (
    <DashboardLayout
      subjects={subjects}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={(id) => {
        setSelectedTopic(null);
        setScore(null);
        resetQuiz();
        setSelectedSubjectId(id);
      }}
      topItem={topItem}
      onLogout={() => (window.location.href = "/")}
    >
      {view === "profile" && <StudentProfileView />}
      {view === "dashboard" && !selectedSubjectId && (
        <StudentHomeView onOpenTopic={openTopic} />
      )}
      {view === "dashboard" && selectedSubjectId && !selectedTopic && (
        <StudentSubjectTopicsView
          selectedSubjectId={selectedSubjectId}
          onTopicClick={openTopic}
        />
      )}
      {view === "dashboard" && selectedTopic && !currentQuiz && score === null && (
        <StudentTopicDetailView
          topic={selectedTopic}
          onBack={() => setSelectedTopic(null)}
          onTakeQuiz={setCurrentQuiz}
        />
      )}
      {view === "dashboard" && selectedTopic && currentQuiz && score === null && (
        <StudentQuizView
          onBack={() => {
            resetQuiz();
          }}
          onFinish={(result) => setScore(result)}
        />
      )}
      {view === "dashboard" && selectedTopic && score !== null && (
        <StudentQuizResultView
          score={score}
          onBack={() => {
            setScore(null);
            resetQuiz();
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default StudentDashboard;