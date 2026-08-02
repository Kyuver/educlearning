import { useState } from "react";
import { Home, User } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useView } from "@store";
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
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [score, setScore] = useState(null);
  const { view, setView } = useView();

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
          setSelectedSubjectId(null);
          setSelectedTopic(null);
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
        onClick={() => {
          setView("profile");
          setSelectedSubjectId(null);
          setSelectedTopic(null);
          setTakingQuiz(false);
          setScore(null);
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
        setTakingQuiz(false);
        setScore(null);
        setSelectedSubjectId(id);
      }}
      topItem={topItem}
      onLogout={() => (window.location.href = "/")}
    >
      {view === "profile" && <StudentProfileView />}
      {view === "dashboard" && !selectedSubjectId && <StudentHomeView />}
      {view === "dashboard" && selectedSubjectId && !selectedTopic && (
        <StudentSubjectTopicsView
          selectedSubjectId={selectedSubjectId}
          onTopicClick={setSelectedTopic}
        />
      )}
      {view === "dashboard" && selectedTopic && !takingQuiz && (
        <StudentTopicDetailView
          topic={selectedTopic}
          onBack={() => setSelectedTopic(null)}
          onTakeQuiz={() => setTakingQuiz(true)}
        />
      )}
      {view === "dashboard" && selectedTopic && takingQuiz && score === null && (
        <StudentQuizView
          onBack={() => setTakingQuiz(false)}
          onSubmit={() => setScore(0)}
        />
      )}
      {view === "dashboard" && selectedTopic && takingQuiz && score !== null && (
        <StudentQuizResultView
          onBack={() => {
            setTakingQuiz(false);
            setScore(null);
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default StudentDashboard;
