import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { X, ChevronDown, Check, Send, Loader2 } from "lucide-react";
import { fetchUsers, fetchUnassignedTopics } from "../../../lib/api";
import { useSendInvitation } from "../../../hooks/useMutations";
import { useShowModal } from "@store";

const subjectGradients = [
  "from-violet to-purple-400",
  "from-blue-600 to-blue-400",
  "from-emerald-500 to-emerald-400",
  "from-amber-500 to-amber-400",
  "from-rose-500 to-rose-400",
  "from-cyan-500 to-cyan-400",
];

function AdminInviteTeacherModal() {
  "use no memo";
  const {closeModal} = useShowModal()
  const [params] = useSearchParams();
  const adminId = Number(params.get("id") ?? 0);

  const [courseOpen, setCourseOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [topicId, setTopicId] = useState("");

  const sendInvitation = useSendInvitation(() => {
    setTeacherId("");
    setTopicId("");
    closeModal();
  });

  useEffect(() => {
    fetchUsers("TEACHER").then(setTeachers);
    fetchUnassignedTopics().then(setTopics);
  }, []);

  const selectedTeacher = (teachers ?? []).find((t) => String(t.id) === teacherId);
  const selectedTopic = (topics ?? []).find((t) => String(t.id) === topicId);

  const grouped = (topics ?? []).reduce((acc, topic) => {
    const subjectId = topic.subject?.id ?? "none";
    if (!acc[subjectId]) acc[subjectId] = [];
    acc[subjectId].push(topic);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#ece7f5]">
          <div>
            <h3 className="font-semibold text-ink text-lg">Invite a teacher</h3>
            <p className="text-sm text-slate mt-1">Send a course invitation to a teacher.</p>
          </div>
          <button onClick={closeModal} className="text-slate hover:text-ink transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Teacher</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {teachers.length === 0 ? (
                <p className="text-sm text-slate/70 col-span-2">No teachers yet</p>
              ) : (
                teachers
                  .filter((t) => t.role === "TEACHER")
                  .map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTeacherId(String(t.id))}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors text-left ${
                        teacherId === String(t.id)
                          ? "border-violet bg-violet/5 text-ink"
                          : "border-[#ece7f5] text-slate hover:border-violet/40"
                      }`}
                    >
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      ) : (
                        <span className="w-8 h-8 rounded-full bg-violet/10 text-violet text-sm font-semibold flex items-center justify-center shrink-0">
                          {t.name?.[0]?.toUpperCase() ?? "?"}
                        </span>
                      )}
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))
              )}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Course</label>
            <div className="relative mt-1.5">
              <button
                type="button"
                onClick={() => setCourseOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-2 border border-[#ece7f5] rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-violet cursor-pointer"
              >
                {selectedTopic ? (
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-ink truncate">{selectedTopic.title}</span>
                    <span className="text-xs text-slate shrink-0">· {selectedTopic.subject?.name}</span>
                  </span>
                ) : (
                  <span className="text-slate">Select a topic...</span>
                )}
                <ChevronDown size={16} className={`text-slate transition-transform ${courseOpen ? "rotate-180" : ""}`} />
              </button>
              {courseOpen && (
                <div className="absolute z-10 top-full mt-2 w-full bg-white border border-[#ece7f5] rounded-lg shadow-lg shadow-[#2a2049]/10 max-h-56 overflow-y-auto">
                  {topics.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-slate/70">No unassigned topics yet</div>
                  ) : (
                    Object.entries(grouped).map(([sid, subjectTopics], i) => (
                      <div key={sid}>
                        <div className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold text-slate uppercase tracking-wide bg-[#faf8ff]">
                          <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${subjectGradients[i % subjectGradients.length]} shrink-0`} />
                          {subjectTopics[0]?.subject?.name}
                        </div>
                        {subjectTopics.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              setTopicId(String(t.id));
                              setCourseOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-[#faf8ff] cursor-pointer"
                          >
                            <span className="truncate">{t.title}</span>
                            {String(t.id) === topicId && <Check size={15} className="text-violet shrink-0 ml-auto" />}
                          </button>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
          <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">
            Cancel
          </button>
          <button
            disabled={!teacherId || !topicId || sendInvitation.isPending}
            onClick={() =>
              sendInvitation.mutate({
                data: {
                  topicId: selectedTopic.id,
                  courseName: selectedTopic.title,
                  status: "PENDING",
                  sentById: adminId,
                  receivedById: selectedTeacher.id,
                },
              })
            }
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 transition-colors cursor-pointer disabled:opacity-60"
          >
            {sendInvitation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {sendInvitation.isPending ? "Sending..." : "Send invitation"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminInviteTeacherModal;
