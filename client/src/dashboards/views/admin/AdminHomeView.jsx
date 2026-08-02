import { Send, UserCheck, CheckCircle2, Plus, BookOpen, Layers, Users, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useSetData } from "../../../store/useData";
import { useCreateData } from "../../../hooks/useMutations";
import { fetchSubjects, fetchUsers, get } from "../../../lib/api";
import { useMemo } from "react";
import { useState } from "react";
import { TopicDetailsModal } from "./AdminReview";
import { MODAL, useShowModal } from "@store";
import { useSection } from "@/store";

const SECTIONS = [
  { key: "default", label: "Overview" },
  { key: "invitations", label: "Course Invitations" },
  { key: "approvals", label: "Topic Approvals" },
];

function AdminHomeView() {
  const setModal = useShowModal((s) => s.setModal);
  const section = useSection((s) => s.section);
  const setSection = useSection((s) => s.setSection);
  const { setData, data } = useSetData();
  const createSubject = useCreateData(() => setData(""));
  const [viewTopic, setViewTopic] = useState(null);

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
    { icon: BookOpen, label: "Subjects", value: subjects.length, color: { bg: "bg-violet/10", text: "text-violet" } },
    { icon: Layers, label: "Topics", value: topics.length, color: { bg: "bg-emerald-50", text: "text-emerald-600" } },
    { icon: Users, label: "Teachers", value: teachers.length, color: { bg: "bg-amber-50", text: "text-amber-600" } },
  ];

  // FOR PENDING SECTION
  const pending = useMemo(() => {
    return topics.filter((f) => f.status === "PENDING");
  }, [topics]);

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
            {stats.map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-[#ece7f5] px-6 py-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color.bg}`}>
                  <Icon size={22} className={color.text} />
                </div>
                <div className="min-w-0">
                  <p className="font-sora font-semibold text-3xl text-ink leading-tight">{value}</p>
                  <p className="text-sm text-slate mt-0.5">{label}</p>
                </div>
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
        <div className="flex-1 flex flex-col">
          <div className="flex gap-3 w-full">
            <input
              type="text"
              onChange={(e) => setData(e.target.value)}
              placeholder="New subject name"
              className="flex-4 border border-[#ece7f5] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-violet"
            />
            <button
              onClick={() => createSubject.mutate({ table: "subject", data: { name: data } })}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus size={16} /> Add Subject
            </button>
          </div>


          {/* Pending Topics */}
          <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden mt-4 flex-1">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-violet" />
                <h2 className="font-sora font-semibold text-ink">Topic approvals</h2>
              </div>
              <span className="text-xs font-semibold text-slate bg-violet/10 text-violet px-2 py-1 rounded-full">
                {pending.length} pending
              </span>
            </div>

            {pending.length === 0 ? (
              <p className="text-sm text-slate text-center py-10 m-auto">No topics waiting for approval.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                {pending.map((topic) => (
                  <div
                    key={topic.id}
                    className="rounded-xl bg-white overflow-hidden border border-[#ece7f5] hover:border-violet/30 hover:shadow-md transition-all flex flex-col h-full"
                  >
                    {topic.coverImage ? (
                      <div className="h-32 w-full">
                        <img
                          src={topic.coverImage}
                          alt={topic.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-32 w-full bg-paper flex items-center justify-center border-b border-[#ece7f5]">
                        <BookOpen size={28} className="text-slate/40" />
                      </div>
                    )}

                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet/10 text-violet truncate">
                          {topic.subject?.name ?? "General"}
                        </span>
                        <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
                          Pending
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-ink truncate">
                        {topic.title}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 text-xs font-semibold">
                          {(topic.teacher?.name ?? topic.teacherName ?? "?")[0]?.toUpperCase()}
                        </div>
                        <p className="text-xs text-slate truncate">
                          {topic.teacher?.name ?? topic.teacherName ?? "Unknown"}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setViewTopic(topic)
                        }}
                        className="w-full mt-2 py-2.5 flex items-center justify-center gap-1 px-3 rounded-lg text-xs font-semibold text-violet bg-violet/10 hover:bg-violet/20 transition-colors cursor-pointer"
                      >
                        View Details
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {viewTopic && (
        <TopicDetailsModal
          topic={viewTopic}
          onClose={() => setViewTopic(null)}
        />
      )}
    </div>
  );
}

export default AdminHomeView;
