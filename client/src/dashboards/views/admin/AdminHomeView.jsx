import { Send, UserCheck, CheckCircle2, Plus, BookOpen, Layers, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useShowModal, useSection, MODAL } from "../../../store/useComponent";
import { useSetData } from "../../../store/useData";
import { useCreateData } from "../../../hooks/useMutations";
import { fetchSubjects, fetchUsers, get } from "../../../lib/api";

const SECTIONS = [
  { key: "default", label: "Overview" },
  { key: "invitations", label: "Course Invitations" },
  { key: "approvals", label: "Topic Approvals" },
  { key: "subject", label: "Add Subject" },
];

function AdminHomeView() {
  const setModal = useShowModal((s) => s.setModal);
  const section = useSection((s) => s.section);
  const setSection = useSection((s) => s.setSection);
  const { setData, data } = useSetData();
  const createSubject = useCreateData(() => setData(""));

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => fetchSubjects(),
  });

  const { data: topics = [] } = useQuery({
    queryKey: ["topics"],
    queryFn: () => get("topic"),
  });
  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => fetchUsers("TEACHER"),
  });

  const stats = [
    { icon: BookOpen, label: "Subjects", value: subjects.length },
    { icon: Layers, label: "Topics", value: topics.length },
    { icon: Users, label: "Teachers", value: teachers.length },
  ];


  return (
    <div className="flex-1 flex flex-col space-y-6">
      <div>
        <h1 className="font-sora font-semibold text-2xl text-ink">Admin Dashboard</h1>
        <p className="text-sm text-slate mt-1">Manage courses, approvals, and teacher invitations.</p>
      </div>

      <div className="flex gap-6 border-b border-[#ece7f5]">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSection(s.key)}
            className={`pb-2 text-sm font-semibold capitalize cursor-pointer relative transition-colors ${section === s.key ? "text-ink" : "text-slate hover:text-ink"}`}
          >
            {s.label}
            {section === s.key && <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-violet rounded-full" />}
          </button>
        ))}
      </div>

      {section === "default" && (
        <div className="flex-1 flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-5">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-md border border-[#ece7f5] px-6 py-5">
                <div className="w-11 h-11 rounded-lg bg-violet/10 flex items-center justify-center">
                  <Icon size={20} className="text-violet" />
                </div>
                <p className="font-sora font-semibold text-2xl text-ink mt-3">{value}</p>
                <p className="text-sm text-slate mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden flex-1 flex flex-col">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[#ece7f5]">
              <BookOpen size={18} className="text-violet" />
              <h2 className="font-sora font-semibold text-ink">Overview</h2>
            </div>
            <p className="text-sm text-slate text-center py-10 m-auto">
              Use the tabs above to manage course invitations, topic approvals, or add a new subject.
            </p>
          </div>
        </div>
      )}

      {section === "invitations" && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="font-sora font-semibold text-lg text-ink">Course invitations</h2>
            <button
              onClick={() => setModal(MODAL.ADMIN_INVITE_TEACHER)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer shrink-0"
            >
              <Send size={16} /> Invite Teacher
            </button>
          </div>
          <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden mt-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5]">
              <div className="flex items-center gap-2">
                <UserCheck size={18} className="text-violet" />
                <h2 className="font-sora font-semibold text-ink">Sent invitations</h2>
              </div>
              <span className="text-xs font-semibold text-slate">0 pending</span>
            </div>
            <p className="text-sm text-slate text-center py-10 m-auto">No invitations sent yet.</p>
          </div>
        </div>
      )}

      {section === "approvals" && (
        <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden flex-1 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-violet" />
              <h2 className="font-sora font-semibold text-ink">Topic approvals</h2>
            </div>
            <span className="text-xs font-semibold text-slate">0 pending</span>
          </div>
          <p className="text-sm text-slate text-center py-10 m-auto">No topics waiting for approval.</p>
        </div>
      )}

      {section === "subject" && (
        <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-[#ece7f5]">
            <h2 className="font-sora font-semibold text-ink">Add a subject</h2>
          </div>
          <div className="p-6">
            <div className="flex gap-3">
              <input
                type="text"
                onChange={(e) => setData(e.target.value)}
                placeholder="New subject name"
                className="flex-1 border border-[#ece7f5] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet"
              />
              <button
                onClick={() => createSubject.mutate({ table: "subject", data: { name: data } })}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 transition-colors cursor-pointer"
              >
                <Plus size={16} /> Add subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHomeView;
