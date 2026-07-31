import { useState, useEffect } from "react";
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
  ClipboardList,
  Shield,
  X,
  Loader2,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import DashboardLayout from "./DashboardLayout";
import {
  subjects as initialSubjects,
  topics as initialTopics,
  pendingItems as initialPending,
  incidents as initialIncidents,
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
  const [pending, setPending] = useState(initialPending);
  const [incidentsList, setIncidentsList] = useState(initialIncidents);
  const [teachersList] = useState(initialTeachers);
  const [invites, setInvites] = useState(initialInvitations);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteTeacherId, setInviteTeacherId] = useState("");
  const [inviteCourse, setInviteCourse] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showInviteModal || confirmLogout ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showInviteModal, confirmLogout]);

  const subjectTopics = topicsList.filter(
    (t) => t.subjectId === selectedSubjectId,
  );
  const selectedSubject = subjectsList.find((s) => s.id === selectedSubjectId);

  function handleSelectSubject(id) {
    setView("dashboard");
    setSelectedSubjectId(id);
  }

  function approve(id) {
    setPending(pending.filter((p) => p.id !== id));
    toast.success("Item approved!");
  }
  function deleteItem(id) {
    setPending(pending.filter((p) => p.id !== id));
  }
  function deleteSubject(id) {
    setSubjectsList(subjectsList.filter((s) => s.id !== id));
    setTopicsList(topicsList.filter((t) => t.subjectId !== id));
    setSelectedSubjectId(null);
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
    const newId = topicsList.length
      ? Math.max(...topicsList.map((t) => t.id)) + 1
      : 1;
    setTopicsList([
      ...topicsList,
      {
        id: newId,
        subjectId: selectedSubjectId,
        title: newTopicTitle,
        content: "Lesson content coming soon.",
        status: "approved",
      },
    ]);
    setNewTopicTitle("");
    toast.success("Topic added!");
  }
  function resolveIncident(id) {
    setIncidentsList(incidentsList.filter((i) => i.id !== id));
    toast.success("Incident resolved!");
  }

  function sendInvite() {
    const teacher = teachersList.find((t) => t.id === Number(inviteTeacherId));
    if (!teacher || !inviteCourse.trim()) {
      toast.error("Pick a teacher and enter a course.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setInvites((prev) => [
        {
          id: Date.now(),
          teacherId: teacher.id,
          course: inviteCourse.trim(),
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

  function updateInviteStatus(id, status) {
    setInvites(
      invites.map((i) => (i.id === id ? { ...i, status } : i)),
    );
    toast.success(`Invitation marked as ${status}.`);
  }
  function removeInvite(id) {
    setInvites(invites.filter((i) => i.id !== id));
  }

  const approvedTopics = topicsList.filter((t) => t.status === "approved").length;
  const stats = [
    { label: "Subjects", value: subjectsList.length, Icon: BookOpen, color: "text-blue-600 bg-blue-50" },
    { label: "Topics", value: topicsList.length, Icon: ClipboardList, color: "text-violet bg-violet/10" },
    { label: "Pending approvals", value: pending.length, Icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
    { label: "Open incidents", value: incidentsList.length, Icon: Shield, color: "text-red-500 bg-red-50" },
  ];

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

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map(({ label, value, Icon, color }) => (
              <div key={label} className="bg-white rounded-md border border-[#ece7f5] p-5 flex items-center gap-4">
                <span className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-2xl font-sora font-bold text-ink">{value}</p>
                  <p className="text-xs text-slate mt-0.5">{label}</p>
                </div>
              </div>
            ))}
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
                      <div className="flex gap-1.5 shrink-0">
                        {inv.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateInviteStatus(inv.id, "accepted")}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer"
                            >
                              <CheckCircle2 size={14} /> Accept
                            </button>
                            <button
                              onClick={() => updateInviteStatus(inv.id, "declined")}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                            >
                              <X size={14} /> Decline
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => removeInvite(inv.id)}
                          className="p-1.5 rounded-lg text-slate hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove invitation"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pending approvals */}
          <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#ece7f5]">
              <h2 className="font-sora font-semibold text-ink">Pending approvals</h2>
            </div>
            {pending.length === 0 ? (
              <p className="text-sm text-slate text-center py-10">No pending items.</p>
            ) : (
              <div className="divide-y divide-[#ece7f5]">
                {pending.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink">{p.name}</p>
                      <p className="text-xs text-slate mt-0.5">{p.type}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => approve(p.id)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => deleteItem(p.id)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Incidents */}
          <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#ece7f5]">
              <h2 className="font-sora font-semibold text-ink">Reported incidents</h2>
            </div>
            {incidentsList.length === 0 ? (
              <p className="text-sm text-slate text-center py-10">No open incidents.</p>
            ) : (
              <div className="divide-y divide-[#ece7f5]">
                {incidentsList.map((i) => (
                  <div key={i.id} className="flex items-start gap-4 px-6 py-4">
                    <div className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <AlertTriangle size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink">{i.type}</p>
                      <p className="text-sm text-slate mt-0.5">{i.description}</p>
                      <p className="text-xs text-slate mt-1">Reported by {i.reportedBy}</p>
                    </div>
                    <button
                      onClick={() => resolveIncident(i.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-violet text-white hover:opacity-90 transition-colors cursor-pointer shrink-0"
                    >
                      Resolve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Course management */}
          <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#ece7f5]">
              <h2 className="font-sora font-semibold text-ink">Course management</h2>
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

              {selectedSubjectId && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-ink">{selectedSubject.name}</h3>
                    <button
                      onClick={() => deleteSubject(selectedSubjectId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} /> Delete subject
                    </button>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <input
                      type="text"
                      placeholder="New topic title"
                      value={newTopicTitle}
                      onChange={(e) => setNewTopicTitle(e.target.value)}
                      className="flex-1 border border-[#ece7f5] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet"
                    />
                    <button
                      onClick={addTopic}
                      className="px-4 py-2.5 rounded-lg border border-[#ece7f5] text-sm font-semibold text-ink hover:bg-paper transition-colors cursor-pointer"
                    >
                      Add topic
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {subjectTopics.map((t) => (
                      <div key={t.id} className="flex items-center justify-between gap-2 border border-[#ece7f5] rounded-lg px-4 py-3">
                        <span className="text-sm font-medium text-ink truncate">{t.title}</span>
                        <button
                          onClick={() => deleteTopic(t.id)}
                          className="text-slate hover:text-red-500 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!selectedSubjectId && (
                <p className="text-sm text-slate mt-4">Pick a course from the sidebar to manage its topics.</p>
              )}
            </div>
          </div>
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

      {confirmLogout &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-xl w-full max-w-sm shadow-xl">
              <div className="px-6 py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Log out</h3>
                  <p className="text-sm text-slate mt-2">Are you sure you want to log out?</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer"
                  onClick={() => setConfirmLogout(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                  onClick={() => { window.location.href = "/"; }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </DashboardLayout>
  );
}
export default AdminDashboard;
