import { useUpdateData } from "@/hooks/useMutations";
import { BookOpen, X, Check, XCircle, Calendar } from "lucide-react";
import { createPortal } from "react-dom";

export function TopicDetailsModal({ topic, onClose }) {
  const updateTopic = useUpdateData(onClose)

  function approveTopic(topicId) {
    updateTopic.mutate({
      table: "topic",
      id: Number(topicId),
      data: {status: "APPROVED"}
    })
  }

  function rejectTopic(topicId) {
    updateTopic.mutate({
      table: "topic",
      id: Number(topicId),
      data: {status: "DENIED"}
    })
  }

  if (!topic) return null;

  const paragraphs = (topic.content || "No explanation provided.")
    .split(/\n+/)
    .filter(Boolean);

  return createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className="bg-white rounded-xl w-full max-w-6xl h-[90vh] shadow-2xl ring-1 ring-black/5 flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-72 shrink-0 border-r border-[#ece7f5] p-6 flex flex-col">
          {topic.coverImage ? (
            <img
              src={topic.coverImage}
              alt={topic.title}
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-40 rounded-lg bg-paper flex items-center justify-center">
              <BookOpen size={32} className="text-slate/40" />
            </div>
          )}

          <span className="inline-block w-fit mt-4 px-2.5 py-1 rounded-full text-xs font-medium capitalize bg-amber-50 text-amber-600">
            {topic.status}
          </span>

          <h3 className="font-semibold text-ink text-lg mt-3 leading-snug">{topic.title}</h3>
          <p className="text-xs text-violet font-medium mt-1">
            {topic.subject?.name || "Unknown Subject"}
          </p>

          <div className="flex items-center gap-2 mt-5 pt-5 border-t border-[#ece7f5]">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-semibold shrink-0">
              {(topic.teacher?.name || topic.teacherName || "?")[0]?.toUpperCase()}
            </div>
            <p className="text-sm text-ink font-medium truncate">
              {topic.teacher?.name || topic.teacherName || "Unknown Teacher"}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate mt-2">
            <Calendar size={12} />
            {topic.createdAt ? new Date(topic.createdAt).toLocaleDateString() : "Unknown date"}
          </div>

          <div className="mt-auto pt-5 flex flex-col gap-2">
            <button
              onClick={() => approveTopic(topic.id)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 transition-colors cursor-pointer shadow-sm shadow-emerald-500/25"
            >
              <Check size={16} strokeWidth={2.5} />
              Approve
            </button>
            <button
              onClick={() => rejectTopic(topic.id)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 active:bg-red-100 transition-colors cursor-pointer"
            >
              <XCircle size={16} strokeWidth={2.5} />
              Reject
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="flex items-center justify-between px-8 py-4 sticky top-0 bg-white/95 border-b border-[#ece7f5] z-10">
            <p className="text-xs font-semibold text-slate uppercase tracking-wide">Explanation</p>
            <button
              onClick={onClose}
              className="text-slate hover:text-ink transition-colors cursor-pointer p-1 rounded-md hover:bg-paper"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-8 py-8 space-y-5 max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base text-ink leading-loose">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
