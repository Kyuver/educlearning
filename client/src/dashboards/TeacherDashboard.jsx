import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Home, User, BookOpen, Brain, FlaskConical, Globe, Music, Wrench, Plus, X, Trash2, ArrowLeft, LogOut } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

import {
  subjects,
  topics as allTopics,
  teacherProfile,
  sections,
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

function TeacherDashboard() {
  const [view, setView] = useState("subjects");
  const [topicsList, setTopicsList] = useState(allTopics);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [tab, setTab] = useState("default");
  const [quizzes, setQuizzes] = useState([]);
  const [quizSubjectId, setQuizSubjectId] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState("");

  useEffect(() => {
    document.body.style.overflow = showAddModal || confirmDelete ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showAddModal, confirmDelete]);

  const [draftContent, setDraftContent] = useState("");
  const mySubjects = subjects.filter((s) =>
    teacherProfile.subjectIds.includes(s.id),
  );
  const mySection = sections.find((sec) => sec.id === teacherProfile.sectionId);
  const subjectTopics = selectedSubjectId
    ? topicsList.filter((t) => t.subjectId === selectedSubjectId)
    : topicsList.filter((t) => mySubjects.some((s) => s.id === t.subjectId));

  function handleSelectSubject(id) {
    setView("subjects");
    setSelectedSubjectId((prev) => (prev === id ? null : id));
  }
  function startEdit(topic) {
    setEditingTopicId((prev) => (prev === topic.id ? null : topic.id));
    setDraftContent(topic.content);
  }
  function saveEdit(topicId) {
    setTopicsList(
      topicsList.map((t) =>
        t.id === topicId ? { ...t, content: draftContent } : t,
      ),
    );
    setEditingTopicId(null);
  }
  function deleteTopic(topicId) {
    setTopicsList(topicsList.filter((t) => t.id !== topicId));
  }
  function saveQuizFromModal(question) {
    if (!newQuizTitle.trim() || !activeTopic) return;
    const newQuiz = {
      id: Date.now(),
      topicId: activeTopic.id,
      title: newQuizTitle.trim(),
      questions: question ? [{ id: Date.now(), ...question }] : [],
    };
    setQuizzes((prev) => [...prev, newQuiz]);
    setNewQuizTitle("");
    setShowAddModal(false);
  }
  function deleteQuiz(id) {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  }
  function addQuestion(quizId, question) {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId ? { ...q, questions: [...q.questions, { id: Date.now(), ...question }] } : q,
      ),
    );
  }
  function deleteQuestion(quizId, questionId) {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId ? { ...q, questions: q.questions.filter((x) => x.id !== questionId) } : q,
      ),
    );
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
        {icon} {label}
      </div>
    );
  }
  const topItem = (
    <>
      {navItem(view === "subjects", "Teacher Dashboard", <Home size={16} />, () => {
        setView("subjects");
        setSelectedSubjectId(null);
      })}
      {navItem(view === "profile", "Profile", <User size={16} />, () =>
        setView("profile"),
      )}
      {navItem(false, "Logout", <LogOut size={16} />, () => {
        window.location.href = "/";
      })}
    </>
  );
  function btn(children, onClick) {
    return (
      <button
        className="cursor-pointer px-4 py-2 rounded-md border border-ink bg-white text-xs font-semibold hover:bg-paper"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <DashboardLayout
      subjects={mySubjects}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={handleSelectSubject}
      topItem={topItem}
    >
      {view === "none" && (
        <p className="text-slate text-sm">Click "Teacher Dashboard" in the sidebar to get started.</p>
      )}
      {view === "profile" && (
          <div className="w-full flex-1 flex flex-col">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
              {/* LEFT: Profile card */}
              <div className="w-full bg-white rounded-md overflow-hidden border border-[#ece7f5] flex flex-col">
                <div className="h-46 w-full bg-violet shrink-0 relative">
                  <div className="absolute left-8 bottom-0 translate-y-1/2 w-36 h-36 rounded-full bg-violet text-white flex items-center justify-center font-bold text-5xl border-4 border-white shrink-0">
                    T
                  </div>
                </div>
                <div className="px-8 pb-6 pt-20 flex-1 flex flex-col">
                  <div className="mt-0">
                    <h2 className="font-sora font-semibold text-2xl text-ink">
                      {teacherProfile.name}
                    </h2>
                    <p className="text-sm text-slate mt-1">
                      {mySection.name} · Teacher
                    </p>
                  </div>
                  <div className="mt-6 flex-1 flex flex-col gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] bg-paper">
                      <span className="text-lg">🏫</span>
                      <div>
                        <p className="text-xs text-slate">School</p>
                        <p className="text-sm font-medium text-ink">
                          KlikAral Demo School
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] bg-paper">
                      <span className="text-lg">📋</span>
                      <div>
                        <p className="text-xs text-slate">Section</p>
                        <p className="text-sm font-medium text-ink">
                          {mySection.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Subjects */}
              <div className="w-full bg-white rounded-md overflow-hidden border border-[#ece7f5] flex flex-col">
                <div className="px-6 py-4 border-b border-[#ece7f5]">
                  <h3 className="font-sora font-semibold text-base text-ink">
                    Subjects handled
                  </h3>
                </div>
                <div className="p-4 flex-1 flex flex-col gap-3">
                  {mySubjects.map((s) => {
                    const Icon = subjectIcons[s.id];
                    const count = topicsList.filter((t) => t.subjectId === s.id).length;
                    return (
                      <div
                        key={s.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] hover:bg-paper transition-colors"
                      >
                        <div
                          className={
                            "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white shrink-0 " +
                            subjectGradients[s.id]
                          }
                        >
                          {Icon && <Icon size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-ink truncate">{s.name}</p>
                          <p className="text-xs text-slate mt-0.5">
                            Course{count !== 1 ? "s" : ""} uploaded: {count}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
      )}
      {view === "subjects" && (
        <div className="space-y-6">
          <div className="flex flex-col items-start justify-start gap-3 rounded-xl border border-[#ece7f5] bg-white p-4 shadow-sm">
            <span className="rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet">
              <span className="text-slate">Section:</span> {mySection.name}
            </span>

            {/* TABS */}
            <div className="flex gap-6 border-b border-[#ece7f5]">
              {[
                { key: "default", label: "Default" },
                { key: "quizzes", label: "Quizzes" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setTab(t.key); if (t.key === "default") setActiveTopic(null); }}
                  className={`pb-2 text-sm font-semibold cursor-pointer relative transition-colors ${tab === t.key ? "text-ink" : "text-slate hover:text-ink"}`}
                >
                  {t.label}
                  {tab === t.key && <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-violet rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {tab === "default" && (
            <div>
              <div className="grid grid-cols-4 gap-4">
                {subjectTopics.map((t) => {
                  return (
                    <div key={t.id} className="bg-white rounded-md border border-[#ece7f5] overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="h-44 w-full overflow-hidden">
                        <img
                          src={t.coverImage}
                          alt={t.title}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 pb-5 min-h-[150px] flex flex-col">
                        <div className="flex-1">
                          <span className="text-[11px] font-semibold text-violet uppercase tracking-wide">
                            {subjects.find((s) => s.id === t.subjectId)?.name}
                          </span>
                          <h3 className="font-sora font-semibold text-sm text-ink leading-snug mt-1">
                            {t.title}
                          </h3>
                          <div className="mt-3 flex items-center gap-2 pt-3 border-t border-[#ece7f5]">
                            <img
                              src={t.teacherAvatar}
                              alt={t.teacherName}
                              className="w-6 h-6 rounded-full object-cover shrink-0"
                            />
                            <span className="text-xs text-slate">{t.teacherName}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-3 mt-3 ">
                          <button
                            className="flex-1 cursor-pointer px-3 py-1.5 rounded-md border border-ink text-ink text-xs font-semibold hover:bg-paper transition-colors"
                            onClick={() => startEdit(t)}
                          >
                            Edit
                          </button>
                          <button
                            className="flex-1 cursor-pointer px-3 py-1.5 rounded-md bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
                            onClick={() => setConfirmDelete(t)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "quizzes" && (
            <div className="space-y-6">
              {!quizSubjectId && (
                <div className="grid grid-cols-2 gap-4">
                  {mySubjects.map((s) => {
                    const Icon = subjectIcons[s.id];
                    return (
                      <div
                        key={s.id}
                        onClick={() => setQuizSubjectId(s.id)}
                        className="flex items-center gap-4 p-5 rounded-xl bg-white border border-[#ece7f5] hover:bg-paper cursor-pointer transition-colors"
                      >
                        <div className={"w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white shrink-0 " + subjectGradients[s.id]}>{Icon && <Icon size={22} />}</div>
                        <div><p className="text-base font-semibold text-ink">{s.name}</p><p className="text-sm text-slate mt-0.5">{topicsList.filter((t) => t.subjectId === s.id).length} topics</p></div>
                      </div>
                    );
                  })}
                </div>
              )}

              {quizSubjectId && !activeTopic && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-slate">Topics under {mySubjects.find((s) => s.id === quizSubjectId)?.name}:</p>
                  {topicsList.filter((t) => t.subjectId === quizSubjectId).map((t) => (
                    <div key={t.id} onClick={() => setActiveTopic(t)} className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#ece7f5] hover:bg-paper cursor-pointer transition-colors">
                      <p className="text-base font-medium text-ink">{t.title}</p>
                      <p className="text-sm text-slate">{quizzes.filter((q) => q.topicId === t.id).length} quizzes</p>
                    </div>
                  ))}
                </div>
              )}

              {quizSubjectId && activeTopic && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setActiveTopic(null)} className="text-slate hover:text-ink cursor-pointer"><ArrowLeft size={20} /></button>
                      <h4 className="text-base font-semibold text-ink">{activeTopic.title}</h4>
                    </div>
                    <button type="button" onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer shrink-0">
                      <Plus size={18} /> Add Quiz
                    </button>
                  </div>
                  <div className="space-y-3">
                    {quizzes.filter((q) => q.topicId === activeTopic.id).length === 0 && <p className="text-sm text-slate text-center py-10">No quizzes yet.</p>}
                    {quizzes.filter((q) => q.topicId === activeTopic.id).map((quiz) => (
                      <QuizCard key={quiz.id} quiz={quiz} onDelete={() => deleteQuiz(quiz.id)} onAddQuestion={(q) => addQuestion(quiz.id, q)} onDeleteQuestion={(qId) => deleteQuestion(quiz.id, qId)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showAddModal && createPortal(
        <AddQuizFormModal
          topicTitle={activeTopic?.title}
          title={newQuizTitle}
          onChangeTitle={setNewQuizTitle}
          onSave={saveQuizFromModal}
          onClose={() => { setShowAddModal(false); setNewQuizTitle(""); }}
        />, document.body
      )}
      {editingTopicId && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
            <div className="px-6 py-4 border-b border-[#ece7f5]">
              <h3 className="font-semibold text-ink">Edit topic content</h3>
            </div>
            <div className="px-6 py-4">
              <textarea
                className="min-h-[200px] w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none"
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer"
                onClick={() => setEditingTopicId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer"
                onClick={() => saveEdit(editingTopicId)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>, document.body
      )}
      {confirmDelete && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl">
            <div className="px-6 py-5">
              <h3 className="font-semibold text-ink">Delete topic</h3>
              <p className="text-sm text-slate mt-2">
                Are you sure you want to delete <span className="font-medium text-ink">{confirmDelete.title}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
              <button
                className="px-4 py-2 rounded-md text-xs font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md text-xs font-semibold bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                onClick={() => {
                  deleteTopic(confirmDelete.id);
                  setConfirmDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>, document.body
      )}
    </DashboardLayout>
  );
}
// ─── Add Quiz Modal ─────────────────────────────────────────────
function AddQuizFormModal({ topicTitle, title, onChangeTitle, onSave, onClose }) {
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSave() {
    if (!questionText.trim() || choices.some((c) => !c.trim())) return;
    onSave({ text: questionText.trim(), choices: [...choices], correctIndex });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-xl flex flex-col overflow-hidden" style={{ height: "80vh" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-slate hover:text-ink cursor-pointer"><ArrowLeft size={20} /></button>
            <h3 className="font-semibold text-ink text-base">Add Quiz — {topicTitle}</h3>
          </div>
          <button onClick={onClose} className="text-slate hover:text-ink cursor-pointer"><X size={20} /></button>
        </div>

        <div className="flex-1 px-6 py-4 space-y-4 overflow-hidden">
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Quiz Title</label>
            <input type="text" className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none" placeholder="Enter quiz title..." value={title} onChange={(e) => onChangeTitle(e.target.value)} />
          </div>

          <div className="border-t border-[#ece7f5] pt-4">
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Question</label>
            <textarea className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none" rows={2} placeholder="e.g. What is 1/2 + 1/4?" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />

            <div className="mt-3">
              <label className="text-xs font-semibold text-slate uppercase tracking-wide">Choices</label>
              <p className="text-xs text-slate mt-0.5 mb-2">Select the radio of the correct answer.</p>
              {choices.map((c, i) => (
                <div key={i} className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2">
                  <input type="radio" name="modalCorrectChoice" checked={correctIndex === i} onChange={() => setCorrectIndex(i)} className="accent-violet shrink-0" />
                  <input type="text" className="flex-1 text-sm outline-none" placeholder={`Choice ${i + 1}`} value={c} onChange={(e) => { const n = [...choices]; n[i] = e.target.value; setChoices(n); }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5] shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer">Save Quiz</button>
        </div>
      </div>
    </div>
  );
}

function QuizCard({ quiz, onDelete, onAddQuestion, onDeleteQuestion }) {
  const [adding, setAdding] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function saveQuestion() {
    if (!questionText.trim() || choices.some((c) => !c.trim())) return;
    onAddQuestion({ text: questionText.trim(), choices: [...choices], correctIndex });
    setQuestionText(""); setChoices(["", "", "", ""]); setCorrectIndex(0); setAdding(false);
  }

  return (
    <div className="bg-white border border-[#ece7f5] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-paper/50">
        <div>
          <p className="text-base font-semibold text-ink">{quiz.title}</p>
          <p className="text-sm text-slate mt-0.5">{quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAdding(!adding)} className="px-4 py-2 rounded-lg text-sm font-semibold border border-violet text-violet hover:bg-violet hover:text-white transition-colors cursor-pointer"><Plus size={16} /> {adding ? "Close" : "Add Question"}</button>
          <button onClick={() => setConfirmDel(true)} className="p-2 rounded-lg border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer"><Trash2 size={16} /></button>
        </div>
      </div>

      {adding && (
        <div className="px-5 py-4 border-t border-[#ece7f5] space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Question</label>
            <textarea className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none" rows={2} placeholder="e.g. What is 1/2 + 1/4?" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Choices</label>
            <p className="text-xs text-slate mt-0.5 mb-3">Select the radio of the correct answer.</p>
            {choices.map((c, i) => (
              <div key={i} className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2">
                <input type="radio" name="correctChoice" checked={correctIndex === i} onChange={() => setCorrectIndex(i)} className="accent-violet shrink-0" />
                <input type="text" className="flex-1 text-sm outline-none" placeholder={`Choice ${i + 1}`} value={c} onChange={(e) => { const n = [...choices]; n[i] = e.target.value; setChoices(n); }} />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">Cancel</button>
            <button onClick={saveQuestion} className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer">Save Question</button>
          </div>
        </div>
      )}

      {quiz.questions.length > 0 && (
        <div className="border-t border-[#ece7f5] divide-y divide-[#ece7f5]">
          {quiz.questions.map((q, i) => (
            <div key={q.id} className="px-5 py-3 flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{i + 1}. {q.text}</p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {q.choices.map((c, j) => (
                    <span key={j} className={`text-xs px-2.5 py-1 rounded-md border ${j === q.correctIndex ? "border-green-400 bg-green-50 text-green-700 font-semibold" : "border-[#ece7f5] text-slate"}`}>{c}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => onDeleteQuestion(q.id)} className="p-1 rounded text-slate hover:text-red-500 cursor-pointer shrink-0 mt-0.5"><X size={14} /></button>
            </div>
          ))}
        </div>
      )}

      {confirmDel && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl">
            <div className="px-6 py-5">
              <h3 className="font-semibold text-ink text-base">Delete quiz</h3>
              <p className="text-sm text-slate mt-2">Delete <span className="font-medium text-ink">{quiz.title}</span>?</p>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
              <button className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer" onClick={() => setConfirmDel(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 cursor-pointer" onClick={() => { onDelete(); setConfirmDel(false); }}>Delete</button>
            </div>
          </div>
        </div>, document.body
      )}
    </div>
  );
}

export default TeacherDashboard;
