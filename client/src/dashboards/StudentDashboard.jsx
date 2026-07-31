import { useState } from "react";
import {
  Home,
  User,
  BookOpen,
  Brain,
  FlaskConical,
  Globe,
  Music,
  Wrench,
  ArrowLeft,
  Bell,
  School,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import {
  subjects,
  topics,
  quizzes,
  sections,
  studentProfile,
} from "../data/mockData";
const subjectIcons = {
  1: BookOpen,
  2: Brain,
  3: FlaskConical,
  4: Globe,
  5: Music,
  6: Wrench,
};
const subjectGradients = {
  1: "from-blue-600 to-blue-400",
  2: "from-rose-600 to-rose-400",
  3: "from-emerald-600 to-emerald-400",
  4: "from-orange-600 to-orange-400",
  5: "from-purple-600 to-purple-400",
  6: "from-cyan-600 to-cyan-400",
};
function StudentDashboard() {
  const [view, setView] = useState("subjects");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [takenQuizIds, setTakenQuizIds] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const mySection = sections.find((s) => s.id === studentProfile.sectionId);
  const approvedTopics = topics.filter((t) => t.status === "approved");
  const subjectTopics = approvedTopics.filter(
    (t) => t.subjectId === selectedSubjectId,
  );
  const selectedTopic = topics.find((t) => t.id === selectedTopicId);
  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  const topicQuiz = quizzes.filter((q) => q.topicId === selectedTopicId);
  const quizTopicIds = [...new Set(quizzes.map((q) => q.topicId))];
  const pendingQuizTopics = quizTopicIds
    .filter((id) => !takenQuizIds.includes(id))
    .map((id) => approvedTopics.find((t) => t.id === id))
    .filter(Boolean);
  function resetToHome() {
    setView("subjects");
    setSelectedSubjectId(null);
    setSelectedTopicId(null);
    setTakingQuiz(false);
    setScore(null);
  }
  function handleSelectSubject(id) {
    setView("subjects");
    setSelectedSubjectId(id);
    setSelectedTopicId(null);
    setTakingQuiz(false);
    setScore(null);
  }
  function goToTopic(topic) {
    setView("subjects");
    setSelectedSubjectId(topic.subjectId);
    setSelectedTopicId(topic.id);
    setTakingQuiz(false);
    setScore(null);
    setAnswers({});
    setNotifOpen(false);
  }
  function selectAnswer(quizId, choice) {
    setAnswers({ ...answers, [quizId]: choice });
  }
  function submitQuiz() {
    let correct = 0;
    topicQuiz.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct += 1;
    });
    setScore({ correct, total: topicQuiz.length });
    if (!takenQuizIds.includes(selectedTopicId)) {
      setTakenQuizIds([...takenQuizIds, selectedTopicId]);
    }
  }
  function navItem(cond, label, icon, onClick) {
    return (
      <div
        className={
          "flex items-center gap-2.5 px-5 py-3 text-sm cursor-pointer border-l-3 " +
          (cond
            ? "bg-white/14 text-white border-gold"
            : "text-white/85 border-transparent hover:bg-white/6")
        }
        onClick={onClick}
      >
        {" "}
        {icon} {label}{" "}
      </div>
    );
  }
  const topItem = (
    <>
      {" "}
      {navItem(
        view === "subjects" && !selectedSubjectId,
        "Student Dashboard",
        <Home size={16} />,
        resetToHome,
      )}{" "}
      {navItem(view === "profile", "Profile", <User size={16} />, () =>
        setView("profile"),
      )}{" "}
    </>
  );
  return (
    <DashboardLayout
      subjects={subjects}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={handleSelectSubject}
      topItem={topItem}
      onLogout={() => (window.location.href = "/")}
    >
      {" "}
      {view === "profile" && (
        <div className="w-full flex-1 flex flex-col">
          {" "}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            {" "}
            <div className="w-full bg-white rounded-md overflow-hidden border border-[#ece7f5] flex flex-col">
              {" "}
              <div className="h-46 w-full bg-violet shrink-0 relative">
                {" "}
                <div className="absolute left-8 bottom-0 translate-y-1/2 w-36 h-36 rounded-full bg-violet text-white flex items-center justify-center font-bold text-5xl border-4 border-white shrink-0">
                  S
                </div>{" "}
              </div>{" "}
              <div className="px-8 pb-6 pt-20 flex-1 flex flex-col">
                {" "}
                <div>
                  {" "}
                  <h2 className="font-sora font-semibold text-2xl text-ink">
                    {studentProfile.name}
                  </h2>{" "}
                  <p className="text-sm text-slate mt-1">
                    {mySection.name} · Student
                  </p>{" "}
                </div>{" "}
                <div className="mt-6 flex-1 flex flex-col gap-4">
                  {" "}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] bg-paper">
                    {" "}
                    <span className="w-9 h-9 rounded-full bg-violet/10 text-violet flex items-center justify-center shrink-0">
                      <School size={18} />
                    </span>{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-slate">School</p>{" "}
                      <p className="text-sm font-medium text-ink">
                        KlikAral Demo School
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] bg-paper">
                    {" "}
                    <span className="w-9 h-9 rounded-full bg-violet/10 text-violet flex items-center justify-center shrink-0">
                      <ClipboardList size={18} />
                    </span>{" "}
                    <div>
                      {" "}
                      <p className="text-xs text-slate">Section</p>{" "}
                      <p className="text-sm font-medium text-ink">
                        {mySection.name}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="w-full bg-white rounded-md overflow-hidden border border-[#ece7f5] flex flex-col">
              {" "}
              <div className="px-6 py-4 border-b border-[#ece7f5]">
                {" "}
                <h3 className="font-sora font-semibold text-base text-ink">
                  My subjects
                </h3>{" "}
              </div>{" "}
              <div className="p-4 flex-1 flex flex-col gap-3">
                {" "}
                {subjects.map((s) => {
                  const Icon = subjectIcons[s.id];
                  const count = approvedTopics.filter(
                    (t) => t.subjectId === s.id,
                  ).length;
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] hover:bg-paper transition-colors"
                    >
                      {" "}
                      <div
                        className={
                          "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white shrink-0 " +
                          subjectGradients[s.id]
                        }
                      >
                        {" "}
                        {Icon && <Icon size={18} />}{" "}
                      </div>{" "}
                      <div className="flex-1 min-w-0">
                        {" "}
                        <p className="text-sm font-medium text-ink truncate">
                          {s.name}
                        </p>{" "}
                        <p className="text-xs text-slate mt-0.5">
                          Topic{count !== 1 ? "s" : ""} available: {count}
                        </p>{" "}
                      </div>{" "}
                    </div>
                  );
                })}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {view === "subjects" && (
        <div className="space-y-6">
          {" "}
          {!selectedSubjectId && (
            <div>
              {" "}
              <div className="flex items-center justify-between gap-4">
                {" "}
                <span className="rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet">
                  {" "}
                  <span className="text-slate">Section:</span>{" "}
                  {mySection.name}{" "}
                </span>{" "}
                <div className="relative z-50">
                  {" "}
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative w-11 h-11 flex items-center justify-center text-ink hover:rounded-full transition-colors cursor-pointer"
                  >
                    {" "}
                    <Bell size={22} />{" "}
                    {pendingQuizTopics.length > 0 && (
                      <span className="absolute top-1 right-2 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                        {pendingQuizTopics.length}
                      </span>
                    )}{" "}
                  </button>{" "}
                  {notifOpen && (
                    <div className="absolute top-12 right-0 w-[340px] max-w-[90vw] bg-[#fdfcff] rounded-md border border-[#e9e2f5] shadow-lg shadow-[#2a2049]/10 overflow-hidden">
                      {" "}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e9e2f5] bg-white">
                        {" "}
                        <div>
                          {" "}
                          <h3 className="font-semibold text-ink text-sm">
                            Quiz reminders
                          </h3>{" "}
                          <p className="text-xs text-slate mt-0.5">
                            {pendingQuizTopics.length > 0
                              ? `${pendingQuizTopics.length} pending`
                              : "You're all caught up"}
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="max-h-72 overflow-y-auto divide-y divide-[#ece7f5]">
                        {" "}
                        {pendingQuizTopics.length === 0 && (
                          <div className="py-12 flex flex-col items-center justify-center gap-3">
                            {" "}
                            <div className="w-14 h-14 rounded-full bg-paper flex items-center justify-center">
                              <CheckCircle2 size={24} className="text-slate" />
                            </div>{" "}
                            <p className="text-sm text-slate font-medium">
                              No pending quizzes
                            </p>{" "}
                          </div>
                        )}{" "}
                        {pendingQuizTopics.map((t) => {
                          const subj = subjects.find(
                            (s) => s.id === t.subjectId,
                          );
                          const Icon = subjectIcons[t.subjectId];
                          return (
                            <div
                              key={t.id}
                              className="flex items-start gap-3 p-4 cursor-pointer hover:bg-paper"
                              onClick={() => goToTopic(t)}
                            >
                              {" "}
                              <div
                                className={
                                  "w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white shrink-0 " +
                                  subjectGradients[t.subjectId]
                                }
                              >
                                {" "}
                                {Icon && <Icon size={16} />}{" "}
                              </div>{" "}
                              <div className="flex-1 min-w-0">
                                {" "}
                                <p className="text-sm font-semibold text-ink">
                                  Quiz not yet taken
                                </p>{" "}
                                <p className="text-xs text-slate mt-1 leading-snug">
                                  {subj?.name} —{" "}
                                  <span className="font-medium text-ink">
                                    {t.title}
                                  </span>
                                </p>{" "}
                              </div>{" "}
                            </div>
                          );
                        })}{" "}
                      </div>{" "}
                    </div>
                  )}{" "}
                </div>{" "}
              </div>{" "}
              <p className="text-sm text-slate mt-6">
                Select a subject from the sidebar to view its lessons.
              </p>{" "}
            </div>
          )}{" "}
          {selectedSubjectId && !selectedTopicId && (
            <div>
              {" "}
              <h1 className="font-sora font-semibold text-2xl text-ink mb-4">
                {selectedSubject.name} Topics
              </h1>{" "}
              <div className="grid grid-cols-4 gap-4">
                {" "}
                {subjectTopics.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTopicId(t.id)}
                    className="bg-white rounded-md border border-[#ece7f5] overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  >
                    {" "}
                    <div className="h-44 w-full overflow-hidden">
                      {" "}
                      <img
                        src={t.coverImage}
                        alt={t.title}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                      />{" "}
                    </div>{" "}
                    <div className="p-5 pb-5 min-h-[150px] flex flex-col">
                      {" "}
                      <div className="flex-1">
                        {" "}
                        <span className="text-[11px] font-semibold text-violet uppercase tracking-wide">
                          {selectedSubject.name}
                        </span>{" "}
                        <h3 className="font-sora font-semibold text-sm text-ink leading-snug mt-1">
                          {t.title}
                        </h3>{" "}
                        <div className="mt-3 flex items-center gap-2 pt-3 border-t border-[#ece7f5]">
                          {" "}
                          <img
                            src={t.teacherAvatar}
                            alt={t.teacherName}
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />{" "}
                          <span className="text-xs text-slate">
                            {t.teacherName}
                          </span>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
                {subjectTopics.length === 0 && (
                  <p className="text-sm text-slate col-span-4 py-10 text-center">
                    No approved topics yet for this subject.
                  </p>
                )}{" "}
              </div>{" "}
            </div>
          )}{" "}
          {selectedTopic && !takingQuiz && (
            <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden max-w-2xl">
              {" "}
              <div className="h-56 w-full overflow-hidden">
                {" "}
                <img
                  src={selectedTopic.coverImage}
                  alt={selectedTopic.title}
                  className="h-full w-full object-cover"
                />{" "}
              </div>{" "}
              <div className="p-6">
                {" "}
                <button
                  onClick={() => setSelectedTopicId(null)}
                  className="flex items-center gap-2 text-slate hover:text-ink text-sm mb-4 cursor-pointer"
                >
                  <ArrowLeft size={16} /> Back to topics
                </button>{" "}
                <h2 className="font-sora font-semibold text-xl text-ink">
                  {selectedTopic.title}
                </h2>{" "}
                <div className="flex items-center gap-2 mt-2 mb-4">
                  {" "}
                  <img
                    src={selectedTopic.teacherAvatar}
                    alt={selectedTopic.teacherName}
                    className="w-6 h-6 rounded-full object-cover"
                  />{" "}
                  <span className="text-xs text-slate">
                    {selectedTopic.teacherName}
                  </span>{" "}
                </div>{" "}
                <p className="text-sm text-slate leading-relaxed">
                  {selectedTopic.content}
                </p>{" "}
                {topicQuiz.length > 0 && (
                  <button
                    className="mt-6 px-5 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
                    onClick={() => {
                      setTakingQuiz(true);
                      setScore(null);
                      setAnswers({});
                    }}
                  >
                    {" "}
                    {takenQuizIds.includes(selectedTopicId)
                      ? "Retake quiz"
                      : "Take quiz"}{" "}
                  </button>
                )}{" "}
              </div>{" "}
            </div>
          )}{" "}
          {takingQuiz && score === null && (
            <div className="bg-white rounded-md border border-[#ece7f5] p-6 max-w-2xl">
              {" "}
              <h2 className="font-sora font-semibold text-lg text-ink mb-4">
                {selectedTopic.title} quiz
              </h2>{" "}
              {topicQuiz.map((q) => (
                <div key={q.id} className="mb-5">
                  {" "}
                  <p className="text-sm font-medium text-ink mb-2">
                    {q.question}
                  </p>{" "}
                  {q.choices.map((choice) => (
                    <label
                      key={choice}
                      className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2 cursor-pointer hover:bg-paper"
                    >
                      {" "}
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        className="accent-violet"
                        checked={answers[q.id] === choice}
                        onChange={() => selectAnswer(q.id, choice)}
                      />{" "}
                      <span className="text-sm text-ink">{choice}</span>{" "}
                    </label>
                  ))}{" "}
                </div>
              ))}{" "}
              <button
                onClick={submitQuiz}
                className="px-5 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
              >
                Submit quiz
              </button>{" "}
            </div>
          )}{" "}
          {takingQuiz && score !== null && (
            <div className="bg-white rounded-md border border-[#ece7f5] p-6 max-w-md text-center">
              {" "}
              <CheckCircle2
                size={40}
                className="text-violet mx-auto mb-3"
              />{" "}
              <h2 className="font-sora font-semibold text-lg text-ink">
                Quiz result
              </h2>{" "}
              <p className="text-sm text-slate mt-2">
                You scored {score.correct} out of {score.total}.
              </p>{" "}
              <button
                onClick={() => setTakingQuiz(false)}
                className="mt-4 px-5 py-2.5 rounded-lg border border-[#ece7f5] text-sm font-semibold text-ink hover:bg-paper cursor-pointer"
              >
                Back to lesson
              </button>{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
    </DashboardLayout>
  );
}
export default StudentDashboard;