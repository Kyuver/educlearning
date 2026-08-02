import { ArrowLeft, BookOpen } from "lucide-react";

function StudentTopicDetailView({ topic, onBack, onTakeQuiz }) {
  return (
    <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
      <div className="p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate hover:text-ink text-sm mb-4 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to topics
        </button>
        <h2 className="font-sora font-semibold text-xl text-ink">
          {topic?.title ?? "Topic Title"}
        </h2>
        <div className="flex items-center gap-2 mt-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 text-xs font-semibold">
            {(topic?.teacher?.name ?? topic?.teacherName ?? "?")[0]?.toUpperCase()}
          </div>
          <span className="text-xs text-slate">
            {topic?.teacher?.name ?? topic?.teacherName ?? "Teacher Name"}
          </span>
        </div>
        <div className="mt-6 p-5 rounded-lg bg-violet/10 border-2 border-violet text-ink">
          <h3 className="font-sora font-semibold text-sm mb-3 flex items-center gap-2 text-violet">
            <BookOpen size={16} />
            About this lesson
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate">
            {topic?.content ?? "Lesson content goes here."}
          </p>
        </div>
        <button
          onClick={onTakeQuiz}
          className="mt-6 px-5 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
        >
          Take quiz
        </button>
      </div>
    </div>
  );
}

export default StudentTopicDetailView;
