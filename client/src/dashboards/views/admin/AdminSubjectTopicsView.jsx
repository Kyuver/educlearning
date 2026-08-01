import { useQuery } from "@tanstack/react-query";
import { BookOpen, Plus } from "lucide-react";
import { useShowModal, MODAL } from "../../../store/useComponent";
import { fetchSubjectTopics, fetchSubject } from "../../../lib/api";

function AdminSubjectTopicsView({ selectedSubjectId }) {
  const setModal = useShowModal((s) => s.setModal);

  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["topics", selectedSubjectId, "APPROVED"],
    queryFn: () => fetchSubjectTopics(selectedSubjectId, "APPROVED"),
    enabled: !!selectedSubjectId,
  });

  const { data: subject } = useQuery({
    queryKey: ["subject", selectedSubjectId],
    queryFn: () => fetchSubject(selectedSubjectId),
    enabled: !!selectedSubjectId,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sora font-semibold text-xl text-ink">
            {subject?.name ?? "Subject Name"} — Topics
          </h2>
          <p className="text-sm text-slate mt-1">{topics.length} topics</p>
        </div>
        <button
          onClick={() => setModal(MODAL.ADMIN_ADD_TOPIC, selectedSubjectId)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 transition-colors cursor-pointer"
        >
          <Plus size={17} /> Add Topic
        </button>
      </div>
      {isLoading ? (
        <div className="mt-6 bg-white rounded-md border border-[#ece7f5] min-h-[calc(100vh-13rem)] flex items-center justify-center">
          <p className="text-sm text-slate">Loading...</p>
        </div>
      ) : topics.length === 0 ? (
        <div className="mt-6 bg-white rounded-md border border-[#ece7f5] min-h-[calc(100vh-13rem)] flex flex-col items-center justify-center gap-3">
          <BookOpen size={32} className="text-slate" />
          <p className="text-sm text-slate font-medium">No topics yet.</p>
          <p className="text-xs text-slate/70">Add a topic for this course.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-5">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-md border border-[#ece7f5] overflow-hidden"
            >
              {topic.coverImage ? (
                <img
                  src={topic.coverImage}
                  alt={topic.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-paper flex items-center justify-center">
                  <BookOpen size={36} className="text-slate" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-sora font-semibold text-lg text-ink">{topic.title}</h3>
                <p className="text-xs text-slate mt-2 capitalize">{topic.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminSubjectTopicsView;
