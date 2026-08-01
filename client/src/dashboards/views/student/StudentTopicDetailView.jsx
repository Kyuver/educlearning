import { ArrowLeft, BookOpen } from "lucide-react";

function StudentTopicDetailView() {
  return (
    <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
      <div className="p-6">
        <button className="flex items-center gap-2 text-slate hover:text-ink text-sm mb-4 cursor-pointer">
          <ArrowLeft size={16} /> Back to topics
        </button>
        <h2 className="font-sora font-semibold text-xl text-ink">Topic Title</h2>
        <div className="flex items-center gap-2 mt-2 mb-6">
          <img
            src="https://i.pravatar.cc/80?img=32"
            alt="Teacher"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-slate">Teacher Name</span>
        </div>
        <div className="mt-6 p-5 rounded-lg bg-violet/10 border-2 border-violet text-ink">
          <h3 className="font-sora font-semibold text-sm mb-3 flex items-center gap-2 text-violet">
            <BookOpen size={16} />
            About this lesson
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate">
            Lesson content goes here.
          </p>
        </div>
        <button className="mt-6 px-5 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer">
          Take quiz
        </button>
      </div>
    </div>
  );
}

export default StudentTopicDetailView;
