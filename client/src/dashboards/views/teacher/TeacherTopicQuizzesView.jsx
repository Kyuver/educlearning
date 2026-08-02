import { useView, useShowModal } from "@store";
import { ArrowLeft, Plus } from "lucide-react";

function TeacherTopicQuizzesView({ topic, onBack }) {
  const { setView } = useView();
  const { setModal } = useShowModal();

  const handleBack = () => {
    if (onBack) onBack();
    setView("dashboard");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer"
            onClick={handleBack}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h4 className="text-lg font-sora font-semibold text-ink">{topic?.title ?? "Topic"}</h4>
            <p className="text-sm text-slate">All quizzes for this topic</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setModal("AddQuizFormModal")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer shrink-0"
        >
          <Plus size={18} /> Add Quiz
        </button>
      </div>
      <div className="bg-white rounded-xl border border-[#ece7f5] p-5">
        <p className="text-xs font-semibold text-violet uppercase tracking-wide">Explanation</p>
        <p className="text-sm text-slate mt-2 leading-relaxed whitespace-pre-wrap">Topic explanation goes here.</p>
      </div>
      <div className="space-y-3">
        <p className="text-sm text-slate text-center py-10">No quizzes yet.</p>
      </div>
    </div>
  );
}

export default TeacherTopicQuizzesView;