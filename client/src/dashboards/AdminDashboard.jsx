import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Home,
  BookOpen,
  Brain,
  FlaskConical,
  Globe,
  Music,
  Wrench,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Send,
  UserCheck,
  X,
  Loader2,
  ChevronDown,
  Check,
  Pencil,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import DashboardLayout from "./DashboardLayout";
import ConfirmLogoutModal from "../compontents/ConfirmLogoutModal";
import ImagePicker from "../compontents/ImagePicker";
import {
  subjects as initialSubjects,
  topics as initialTopics,
  teachers as initialTeachers,
  invitations as initialInvitations,
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

const statusStyles = {
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  accepted: "bg-green-50 text-green-600 border-green-200",
  declined: "bg-red-50 text-red-500 border-red-200",
};

function AdminDashboard() {
  const [view, setView] = useState("dashboard");
  const [subjectsList, setSubjectsList] = useState(initialSubjects);
  const [topicsList, setTopicsList] = useState(initialTopics);
  const [teachersList] = useState(initialTeachers);
  const [invites, setInvites] = useState(initialInvitations);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newTopicCover, setNewTopicCover] = useState("");
  const [newTopicTeacherId, setNewTopicTeacherId] = useState("");
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteTeacherId, setInviteTeacherId] = useState("");
  const [inviteCourseId, setInviteCourseId] = useState("");
  const [sending, setSending] = useState(false);
  const [viewTopic, setViewTopic] = useState(null);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [teacherDropdownOpen, setTeacherDropdownOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const teacherDropdownRef = useRef(null);
  const courseDropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = showInviteModal || confirmLogout || viewTopic || showAddTopicModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showInviteModal, confirmLogout, viewTopic, showAddTopicModal]);

  useEffect(() => {
    function handleOutsideClick(e) {
    if (teacherDropdownRef.current && !teacherDropdownRef.current.contains(e.target)) {
      setTeacherDropdownOpen(false);
    }
    if (courseDropdownRef.current && !courseDropdownRef.current.contains(e.target)) {
      setCourseDropdownOpen(false);
    }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const subjectTopics = topicsList.filter(
    (t) => t.subjectId === selectedSubjectId,
  );
  const selectedSubject = subjectsList.find((s) => s.id === selectedSubjectId);

  function handleSelectSubject(id) {
    setView("dashboard");
    setSelectedSubjectId(id);
  }

  function deleteTopic(id) {
    setTopicsList(topicsList.filter((t) => t.id !== id));
  }
  function addSubject() {
    if (!newSubjectName.trim()) return;
    const newId = Math.max(...subjectsList.map((s) => s.id)) + 1;
    setSubjectsList([...subjectsList, { id: newId, name: newSubjectName }]);
    setNewSubjectName("");
    toast.success("Subject added!");
  }
  function addTopic() {
    if (!newTopicTitle.trim() || !selectedSubjectId) return;
    const teacher = teachersList.find((t) => t.id === Number(newTopicTeacherId));
    const newId = topicsList.length
      ? Math.max(...topicsList.map((t) => t.id)) + 1
      : 1;
    setTopicsList([
      ...topicsList,
      {
        id: newId,
        subjectId: selectedSubjectId,
        title: newTopicTitle.trim(),
        content: newTopicContent.trim() || "No explanation yet.",
        status: "approved",
        teacherName: teacher?.name || "Unassigned",
        teacherAvatar: teacher?.avatar || "https://i.pravatar.cc/80?img=68",
        coverImage: newTopicCover.trim() || `https://picsum.photos/seed/adtopic${newId}/400/300`,
      },
    ]);
    setNewTopicTitle("");
    setNewTopicContent("");
    setNewTopicCover("");
    setNewTopicTeacherId("");
    setShowAddTopicModal(false);
    toast.success(teacher ? `Topic added and assigned to ${teacher.name}!` : "Topic added!");
  }
  function openEditTopic(topic) {
    setEditingTopic(topic);
    setNewTopicTitle(topic.title);
    setNewTopicContent(topic.content);
    setNewTopicCover(topic.coverImage);
    setNewTopicTeacherId(
      String(teachersList.find((t) => t.name === topic.teacherName)?.id ?? ""),
    );
    setShowAddTopicModal(true);
  }
  function saveTopicEdit() {
    if (!newTopicTitle.trim() || !editingTopic) return;
    const teacher = teachersList.find((t) => t.id === Number(newTopicTeacherId));
    setTopicsList(
      topicsList.map((t) =>
        t.id === editingTopic.id
          ? {
              ...t,
              title: newTopicTitle.trim(),
              content: newTopicContent.trim() || "No explanation yet.",
              coverImage: newTopicCover.trim() || t.coverImage,
              teacherName: teacher?.name || "Unassigned",
              teacherAvatar: teacher?.avatar || t.teacherAvatar,
            }
          : t,
      ),
    );
    setNewTopicTitle("");
    setNewTopicContent("");
    setNewTopicCover("");
    setNewTopicTeacherId("");
    setEditingTopic(null);
    setShowAddTopicModal(false);
    toast.success("Topic updated!");
  }
  function approveTopic(id) {
    setTopicsList(
      topicsList.map((t) => (t.id === id ? { ...t, status: "approved" } : t)),
    );
    toast.success("Topic approved!");
  }
  function rejectTopic(id) {
    setTopicsList(
      topicsList.map((t) => (t.id === id ? { ...t, status: "denied" } : t)),
    );
    toast.success("Topic rejected.");
  }

  function sendInvite() {
    const teacher = teachersList.find((t) => t.id === Number(inviteTeacherId));
    const subject = subjectsList.find((s) => s.id === Number(inviteCourseId));
    if (!teacher || !subject) {
      toast.error("Pick a teacher and a course.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setInvites((prev) => [
        {
          id: Date.now(),
          teacherId: teacher.id,
          course: subject.name,
          status: "pending",
          sentAt: "Just now",
        },
        ...prev,
      ]);
      setSending(false);
      setShowInviteModal(false);
      setInviteTeacherId("");
      setInviteCourse("");
      toast.success(`Invitation sent to ${teacher.name}!`);
    }, 700);
  }

  const topItem = (
    <div
      className={`flex items-center gap-2.5 px-5 py-3 text-sm cursor-pointer border-l-3 ${view === "dashboard" ? "bg-white/14 text-white border-gold" : "text-white/85 border-transparent hover:bg-white/6"}`}
      onClick={() => { setView("dashboard"); setSelectedSubjectId(null); }}
    >
      <Home size={16} /> Admin Dashboard
    </div>
  );

  return (
    <DashboardLayout
      subjects={subjectsList}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={handleSelectSubject}
      topItem={topItem}
      onLogout={() => setConfirmLogout(true)}
    >
      {view === "dashboard" && (
        <div className="space-y-6">
          {selectedSubjectId ? (
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-sora font-semibold text-xl text-ink">{selectedSubject.name} — Topics</h2>
                  <p className="text-sm text-slate mt-1">{subjectTopics.length} topic{subjectTopics.length !== 1 ? "s" : ""}</p>
                </div>
                <button
                  onClick={() => setShowAddTopicModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 transition-colors cursor-pointer"
                >
                  <Plus size={17} /> Add Topic
                </button>
              </div>
              {subjectTopics.length === 0 ? (
                <div className="mt-6 bg-white rounded-md border border-[#ece7f5] py-16 flex flex-col items-center justify-center gap-3">
                  <BookOpen size={32} className="text-slate" />
                  <p className="text-sm text-slate font-medium">No topics yet.</p>
                  <p className="text-xs text-slate/70">Add a topic for this course.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {subjectTopics.map((t) => (
                    <div key={t.id} className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
                      <div className={`h-36 overflow-hidden bg-gradient-to-br ${subjectGradients[selectedSubjectId] || "from-violet to-purple-400"}`}>
                        <img src={t.coverImage} alt={t.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-ink truncate">{t.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <img src={t.teacherAvatar} alt={t.teacherName} className="w-6 h-6 rounded-full object-cover shrink-0" />
                          <span className="text-xs text-slate truncate">{t.teacherName}</span>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-[#ece7f5]">
                          <button
                            onClick={() => openEditTopic(t)}
                            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-violet bg-violet/10 hover:bg-violet/20 transition-colors cursor-pointer"
                          >
                            <Pencil size={12} /> Edit
                          </button>
                          <button
                            onClick={() => deleteTopic(t.id)}
                            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-sora font-semibold text-2xl text-ink">Admin Dashboard</h1>
                  <p className="text-sm text-slate mt-1">Manage courses, approvals, and teacher invitations.</p>
                </div>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer shrink-0"
                >
                  <Send size={18} /> Invite Teacher
                </button>
              </div>

              {/* Invitations */}
              <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5]">
                  <div className="flex items-center gap-2">
                    <UserCheck size={18} className="text-violet" />
                    <h2 className="font-sora font-semibold text-ink">Course invitations</h2>
                  </div>
                  <span className="text-xs font-semibold text-slate">{invites.filter((i) => i.status === "pending").length} pending</span>
                </div>
                {invites.length === 0 ? (
                  <p className="text-sm text-slate text-center py-10">No invitations sent yet.</p>
                ) : (
                  <div className="divide-y divide-[#ece7f5]">
                    {invites.map((inv) => {
                      const teacher = teachersList.find((t) => t.id === inv.teacherId);
                      return (
                        <div key={inv.id} className="flex items-center gap-4 px-6 py-4">
                          <img src={teacher?.avatar} alt={teacher?.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-ink">{teacher?.name}</p>
                            <p className="text-sm text-slate mt-0.5">
                              Invited to teach <span className="font-medium text-ink">{inv.course}</span>
                            </p>
                            <p className="text-xs text-slate mt-1">{inv.sentAt}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize shrink-0 ${statusStyles[inv.status]}`}>
                            {inv.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Pending topic approvals */}
              <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-violet" />
                    <h2 className="font-sora font-semibold text-ink">Topic approvals</h2>
                  </div>
                  <span className="text-xs font-semibold text-slate">{topicsList.filter((t) => t.status === "pending").length} pending</span>
                </div>
                {topicsList.filter((t) => t.status === "pending").length === 0 ? (
                  <p className="text-sm text-slate text-center py-10">No topics waiting for approval.</p>
                ) : (
                  <div className="divide-y divide-[#ece7f5]">
                    {topicsList.filter((t) => t.status === "pending").map((t) => (
                      <div key={t.id} className="flex items-start gap-4 px-6 py-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-ink">{t.title}</p>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-violet bg-violet/10 shrink-0">
                              {subjectsList.find((s) => s.id === t.subjectId)?.name}
                            </span>
                          </div>
                          <p className="text-xs text-slate mt-1">
                            Uploaded by <span className="font-medium text-ink">{t.teacherName}</span>
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => setViewTopic(t)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-[#ece7f5] text-ink hover:bg-paper transition-colors cursor-pointer"
                          >
                            View more details
                          </button>
                          <button
                            onClick={() => approveTopic(t.id)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => rejectTopic(t.id)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add subject */}
              <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#ece7f5]">
                  <h2 className="font-sora font-semibold text-ink">Add a subject</h2>
                </div>
                <div className="p-6">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="New subject name"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      className="flex-1 border border-[#ece7f5] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet"
                    />
                    <button
                      onClick={addSubject}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 transition-colors cursor-pointer"
                    >
                      <Plus size={16} /> Add subject
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {showInviteModal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
              <div className="flex items-start justify-between px-6 py-5 border-b border-[#ece7f5]">
                <div>
                  <h3 className="font-semibold text-ink text-lg">Invite a teacher</h3>
                  <p className="text-sm text-slate mt-1">Send a course invitation to a teacher.</p>
                </div>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-slate hover:text-ink transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate uppercase tracking-wide">Teacher</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {teachersList.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setInviteTeacherId(String(t.id))}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors text-left ${inviteTeacherId === String(t.id) ? "border-violet bg-violet/5 text-ink" : "border-[#ece7f5] text-slate hover:border-violet/40"}`}
                      >
                        <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <span className="truncate">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate uppercase tracking-wide">Course</label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Literacy"
                    value={inviteCourse}
                    onChange={(e) => setInviteCourse(e.target.value)}
                    className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none focus:border-violet"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={sendInvite}
                  disabled={sending}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 transition-colors cursor-pointer disabled:opacity-60"
                >
                  {sending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {sending ? "Sending..." : "Send invitation"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {viewTopic &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
              <div className="flex items-start justify-between px-6 py-5 border-b border-[#ece7f5]">
                <h3 className="font-semibold text-ink text-lg">Topic review</h3>
                <button onClick={() => setViewTopic(null)} className="text-slate hover:text-ink transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="h-36 rounded-lg overflow-hidden">
                  <img src={viewTopic.coverImage} alt={viewTopic.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-ink">{viewTopic.title}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-violet bg-violet/10 shrink-0">
                    {subjectsList.find((s) => s.id === viewTopic.subjectId)?.name}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-violet uppercase tracking-wide">Explanation</p>
                  <p className="text-sm text-slate mt-1 leading-relaxed">{viewTopic.content || "No explanation yet."}</p>
                </div>
                <p className="text-xs text-slate">
                  Uploaded by <span className="font-medium text-ink">{viewTopic.teacherName}</span>
                </p>
              </div>
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
                <button
                  onClick={() => rejectTopic(viewTopic.id)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                >
                  Decline
                </button>
                <button
                  onClick={() => { approveTopic(viewTopic.id); setViewTopic(null); }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {showAddTopicModal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
              <div className="flex items-start justify-between px-6 py-5 border-b border-[#ece7f5]">
                <div>
                  <h3 className="font-semibold text-ink text-lg">{editingTopic ? "Edit topic" : "Add a topic"}</h3>
                  <p className="text-sm text-slate mt-1">in {selectedSubject?.name}</p>
                </div>
                <button onClick={() => { setShowAddTopicModal(false); setEditingTopic(null); }} className="text-slate hover:text-ink transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate uppercase tracking-wide">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Fractions"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none focus:border-violet"
                  />
                </div>
                <div>
                  <ImagePicker label="Thumbnail" value={newTopicCover} onChange={setNewTopicCover} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate uppercase tracking-wide">Explanation</label>
                  <textarea
                    rows={4}
                    placeholder="Topic explanation shown to students..."
                    value={newTopicContent}
                    onChange={(e) => setNewTopicContent(e.target.value)}
                    className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none focus:border-violet"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate uppercase tracking-wide">Assign to teacher</label>
                  <div ref={teacherDropdownRef} className="relative mt-1.5">
                    <button
                      type="button"
                      onClick={() => setTeacherDropdownOpen((o) => !o)}
                      className="w-full flex items-center justify-between gap-2 border border-[#ece7f5] rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-violet cursor-pointer"
                    >
                      {newTopicTeacherId ? (
                        <span className="flex items-center gap-2">
                          <img
                            src={teachersList.find((t) => String(t.id) === String(newTopicTeacherId))?.avatar}
                            alt=""
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-ink">{teachersList.find((t) => String(t.id) === String(newTopicTeacherId))?.name}</span>
                        </span>
                      ) : (
                        <span className="text-slate">No teacher assigned</span>
                      )}
                      <ChevronDown size={16} className={`text-slate transition-transform ${teacherDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {teacherDropdownOpen && (
                      <div className="absolute z-10 top-full mt-2 w-full bg-white border border-[#ece7f5] rounded-lg shadow-lg shadow-[#2a2049]/10 max-h-40 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setNewTopicTeacherId("");
                            setTeacherDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate hover:bg-[#faf8ff] cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border border-[#ece7f5] flex items-center justify-center text-[10px] text-slate">—</span>
                            No teacher
                          </span>
                          {!newTopicTeacherId && <Check size={15} className="text-violet" />}
                        </button>
                        <div className="border-t border-[#ece7f5]" />
                        {teachersList.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              setNewTopicTeacherId(String(t.id));
                              setTeacherDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-ink hover:bg-[#faf8ff] cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <img src={t.avatar} alt={t.name} className="w-5 h-5 rounded-full object-cover" />
                              {t.name}
                            </span>
                            {String(t.id) === String(newTopicTeacherId) && <Check size={15} className="text-violet" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
                <button
                  onClick={() => { setShowAddTopicModal(false); setEditingTopic(null); }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={editingTopic ? saveTopicEdit : addTopic}
                  disabled={!newTopicTitle.trim()}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingTopic ? "Save Changes" : "Add Topic"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <ConfirmLogoutModal
        open={confirmLogout}
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => { window.location.href = "/"; }}
      />
    </DashboardLayout>
  );
}
export default AdminDashboard;