import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Home, User, BookOpen, Brain, FlaskConical, Globe, Music, Wrench, Plus, X, Trash2, ArrowLeft, LogOut, AlertTriangle, Loader2, CheckCircle2, School, ClipboardList, Bell } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import DashboardLayout from "./DashboardLayout";
import ConfirmLogoutModal from "../compontents/ConfirmLogoutModal";
import ImagePicker from "../compontents/ImagePicker";

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

  const [quizzes, setQuizzes] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newTopicCover, setNewTopicCover] = useState("");
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [statusFilter, setStatusFilter] = useState("approved");
  const [showInvite, setShowInvite] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showAddModal || showAddTopicModal || confirmDelete || confirmLogout ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showAddModal, showAddTopicModal, confirmDelete, confirmLogout]);

  const [draftContent, setDraftContent] = useState("");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftCover, setDraftCover] = useState("");
  const mySubjects = subjects.filter((s) =>
    teacherProfile.subjectIds.includes(s.id),
  );
  const mySection = sections.find((sec) => sec.id === teacherProfile.sectionId);
  const subjectTopics = selectedSubjectId
    ? topicsList.filter((t) => t.subjectId === selectedSubjectId)
    : topicsList.filter((t) => mySubjects.some((s) => s.id === t.subjectId));
  const filteredTopics = subjectTopics.filter((t) => t.status === statusFilter);

  function handleSelectSubject(id) {
    setView("subjects");
    setSelectedSubjectId((prev) => (prev === id ? null : id));
  }
  function startEdit(topic) {
    setEditingTopicId((prev) => (prev === topic.id ? null : topic.id));
    setDraftContent(topic.content);
    setDraftTitle(topic.title);
    setDraftCover(topic.coverImage);
  }
  function saveEdit(topicId) {
    setTopicsList(
      topicsList.map((t) =>
        t.id === topicId
          ? { ...t, title: draftTitle, coverImage: draftCover, content: draftContent }
          : t,
      ),
    );
    setEditingTopicId(null);
  }
  function addTopic() {
    if (!newTopicTitle.trim()) return;
    const newId = topicsList.length
      ? Math.max(...topicsList.map((t) => t.id)) + 1
      : 1;
    setTopicsList([
      ...topicsList,
      {
        id: newId,
        subjectId: selectedSubjectId || mySubjects[0]?.id,
        title: newTopicTitle.trim(),
        content: newTopicContent.trim() || "No explanation yet.",
        status: "pending",
        teacherName: teacherProfile.name,
        teacherAvatar: "https://i.pravatar.cc/80?img=68",
        coverImage: newTopicCover.trim() || `https://picsum.photos/seed/topic${newId}/400/300`,
      },
    ]);
    setNewTopicTitle("");
    setNewTopicContent("");
    setNewTopicCover("");
    setShowAddTopicModal(false);
    toast.success("Topic added! It's pending admin approval.");
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
      onLogout={() => setConfirmLogout(true)}
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
                      <span className="w-9 h-9 rounded-full bg-violet/10 text-violet flex items-center justify-center shrink-0"><School size={18} /></span>
                      <div>
                        <p className="text-xs text-slate">School</p>
                        <p className="text-sm font-medium text-ink">
                          KlikAral Demo School
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] bg-paper">
                      <span className="w-9 h-9 rounded-full bg-violet/10 text-violet flex items-center justify-center shrink-0"><ClipboardList size={18} /></span>
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
          {activeTopic ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveTopic(null)} className="text-slate hover:text-ink cursor-pointer"><ArrowLeft size={20} /></button>
                  <div>
                    <h4 className="text-lg font-sora font-semibold text-ink">{activeTopic.title}</h4>
                    <p className="text-sm text-slate">All quizzes for this topic</p>
                  </div>
                </div>
                <button type="button" onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer shrink-0">
                  <Plus size={18} /> Add Quiz
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#ece7f5] p-5">
                <p className="text-xs font-semibold text-violet uppercase tracking-wide">Explanation</p>
                <p className="text-sm text-slate mt-2 leading-relaxed">{activeTopic.content || "No explanation yet."}</p>
              </div>
              <div className="space-y-3">
                {quizzes.filter((q) => q.topicId === activeTopic.id).length === 0 && <p className="text-sm text-slate text-center py-10">No quizzes yet.</p>}
                {quizzes.filter((q) => q.topicId === activeTopic.id).map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onDelete={() => deleteQuiz(quiz.id)} onAddQuestion={(q) => addQuestion(quiz.id, q)} onDeleteQuestion={(qId) => deleteQuestion(quiz.id, qId)} />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet">
                  <span className="text-slate">Section:</span> {mySection.name}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddTopicModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
                  >
                    <Plus size={17} /> Add Topic
                  </button>
                  <div className="relative z-50">
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative w-11 h-11 flex items-center justify-center text-ink  hover:rounded-full transition-colors cursor-pointer"
                  >
                    <Bell size={22} />
                    {showInvite && (
                      <span className="absolute top-1 right-2 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
                    )}
                  </button>

                  {notifOpen && (
                    <div className="absolute top-12 right-0 w-[340px] max-w-[90vw] bg-[#fdfcff] rounded-md border border-[#e9e2f5] shadow-lg shadow-[#2a2049]/10 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e9e2f5] bg-white">
                        <div>
                          <h3 className="font-semibold text-ink text-sm">Notifications</h3>
                          <p className="text-xs text-slate mt-0.5">{showInvite ? "3 unread" : "You're all caught up"}</p>
                        </div>
                        {showInvite && (
                          <button onClick={() => setShowInvite(false)} className="text-xs font-semibold text-violet hover:underline cursor-pointer">Mark all as read</button>
                        )}
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-[#ece7f5]">
                        {showInvite && (
                          <div className="flex items-start gap-3 p-4">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shrink-0">
                              <BookOpen size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-ink">Course Invitation</p>
                                <span className="w-2 h-2 rounded-full bg-violet shrink-0 mt-1.5" />
                              </div>
                              <p className="text-xs text-slate mt-1 leading-snug">
                                Admin invited you to teach <span className="font-medium text-ink">Computer Literacy</span>.
                              </p>
                              <p className="text-xs text-slate mt-1.5">Just now</p>
                              <div className="flex gap-2 mt-2">
                                <button onClick={() => setShowInvite(false)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer">Accept</button>
                                <button onClick={() => setShowInvite(false)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer">Decline</button>
                              </div>
                            </div>
                          </div>
                        )}
                        {showInvite && (
                          <div className="flex items-start gap-3 p-4">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white shrink-0">
                              <FlaskConical size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-ink">Course Invitation</p>
                                <span className="w-2 h-2 rounded-full bg-violet shrink-0 mt-1.5" />
                              </div>
                              <p className="text-xs text-slate mt-1 leading-snug">
                                Admin invited you to teach <span className="font-medium text-ink">Science 5</span>.
                              </p>
                              <p className="text-xs text-slate mt-1.5">5 minutes ago</p>
                              <div className="flex gap-2 mt-2">
                                <button onClick={() => setShowInvite(false)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer">Accept</button>
                                <button onClick={() => setShowInvite(false)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer">Decline</button>
                              </div>
                            </div>
                          </div>
                        )}
                        {showInvite && (
                          <div className="flex items-start gap-3 p-4">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center text-white shrink-0">
                              <Wrench size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-ink">Course Invitation</p>
                                <span className="w-2 h-2 rounded-full bg-violet shrink-0 mt-1.5" />
                              </div>
                              <p className="text-xs text-slate mt-1 leading-snug">
                                Admin invited you to teach <span className="font-medium text-ink">Technology and Livelihood Education</span>.
                              </p>
                              <p className="text-xs text-slate mt-1.5">1 hour ago</p>
                              <div className="flex gap-2 mt-2">
                                <button onClick={() => setShowInvite(false)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer">Accept</button>
                                <button onClick={() => setShowInvite(false)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer">Decline</button>
                              </div>
                            </div>
                          </div>
                        )}
                        {!showInvite && (
                          <div className="py-12 flex flex-col items-center justify-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-paper flex items-center justify-center">
                              <Bell size={24} className="text-slate" />
                            </div>
                            <p className="text-sm text-slate font-medium">No new notifications</p>
                            <p className="text-xs text-slate/70">New updates will appear here.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </div>
              <div className="flex gap-6 mt-5 mb-5 border-b border-[#ece7f5]">
                {["approved", "pending", "denied"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`pb-2 text-sm font-semibold capitalize cursor-pointer relative transition-colors ${statusFilter === st ? "text-ink" : "text-slate hover:text-ink"}`}
                  >
                    {st}
                    {statusFilter === st && <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-violet rounded-full" />}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {filteredTopics.map((t) => {
                  return (
                    <div key={t.id} onClick={() => setActiveTopic(t)} className="bg-white rounded-md border border-[#ece7f5] overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
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
                      <button
                        onClick={(e) => { e.stopPropagation(); startEdit(t); }}
                        className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[#ece7f5] text-xs font-semibold text-ink hover:bg-paper transition-colors cursor-pointer"
                      >
                        <Plus size={14} /> Edit topic
                      </button>
                    </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
      {showAddTopicModal && createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5]">
              <h3 className="font-semibold text-ink text-base">Add Topic</h3>
              <button onClick={() => setShowAddTopicModal(false)} className="text-slate hover:text-ink cursor-pointer"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate uppercase tracking-wide">Title</label>
                <input
                  type="text"
                  className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none"
                  placeholder="e.g. Fractions"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                />
              </div>
              <div>
                <ImagePicker label="Picture" value={newTopicCover} onChange={setNewTopicCover} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate uppercase tracking-wide">Explanation</label>
                <textarea
                  className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none"
                  rows={5}
                  placeholder="e.g. A fraction represents a part of a whole..."
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
              <button
                onClick={() => setShowAddTopicModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={addTopic}
                disabled={!newTopicTitle.trim()}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 size={16} /> Add Topic
              </button>
            </div>
          </div>
        </div>, document.body
      )}
      {editingTopicId && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
            <div className="px-6 py-4 border-b border-[#ece7f5]">
              <h3 className="font-semibold text-ink">Edit topic</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate uppercase tracking-wide">Title</label>
                <input
                  type="text"
                  className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate uppercase tracking-wide">Picture</label>
                <input
                  type="text"
                  className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none"
                  placeholder="Paste an image URL..."
                  value={draftCover}
                  onChange={(e) => setDraftCover(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate uppercase tracking-wide">Explanation</label>
                <textarea
                  className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none"
                  rows={4}
                  placeholder="Topic explanation shown to students..."
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                />
              </div>
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
      <ConfirmLogoutModal
        open={confirmLogout}
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => { window.location.href = "/"; }}
      />
      {confirmDelete && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl">
            <div className="px-6 py-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-ink">Delete topic</h3>
                <p className="text-sm text-slate mt-2">
                  Are you sure you want to delete <span className="font-medium text-ink">{confirmDelete.title}</span>? This action cannot be undone.
                </p>
              </div>
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
  const [saving, setSaving] = useState(false);

  function handleSave() {
    if (!questionText.trim() || choices.some((c) => !c.trim())) return;
    if (saving) return;
    setSaving(true);
    setTimeout(() => {
      onSave({ text: questionText.trim(), choices: [...choices], correctIndex });
      toast.success("Quiz added successfully!");
      setSaving(false);
    }, 800);
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
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />} {saving ? "Saving..." : "Save Quiz"}
          </button>
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
  const [saving, setSaving] = useState(false);

  function saveQuestion() {
    if (!questionText.trim() || choices.some((c) => !c.trim())) return;
    if (saving) return;
    setSaving(true);
    setTimeout(() => {
      onAddQuestion({ text: questionText.trim(), choices: [...choices], correctIndex });
      toast.success("Question added successfully!");
      setSaving(false);
      setQuestionText(""); setChoices(["", "", "", ""]); setCorrectIndex(0); setAdding(false);
    }, 500);
  }

  return (
    <div className="bg-white border border-[#ece7f5] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-paper/50">
        <div>
          <p className="text-base font-semibold text-ink">{quiz.title}</p>
          <p className="text-sm text-slate mt-0.5">{quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAdding(!adding)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-violet text-violet hover:bg-violet hover:text-white transition-colors cursor-pointer"><Plus size={16} /> {adding ? "Close" : "Add Question"}</button>
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
            <button onClick={saveQuestion} disabled={saving} className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} {saving ? "Saving..." : "Save Question"}
            </button>
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
            <div className="px-6 py-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-ink text-base">Delete quiz</h3>
                <p className="text-sm text-slate mt-2">Delete <span className="font-medium text-ink">{quiz.title}</span>?</p>
              </div>
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
