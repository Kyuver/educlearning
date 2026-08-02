import { useQuery } from "@tanstack/react-query";
import { BookOpen, PlayCircle } from "lucide-react";
import { fetchSubjectTopics, fetchSubject } from "../../../lib/api";

function StudentSubjectTopicsView({ selectedSubjectId, onTopicClick }) {
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-sora font-semibold text-xl text-ink">
            {subject?.name ?? "Subject Name"} — Lessons
          </h2>
          <p className="text-sm text-slate mt-1">{topics.length} lessons</p>
        </div>
      </div>
      {isLoading ? (
        <div className="bg-white rounded-md border border-[#ece7f5] min-h-[calc(100vh-13rem)] flex items-center justify-center">
          <p className="text-sm text-slate">Loading...</p>
        </div>
) : topics.length === 0 ? (
        <div className="bg-white rounded-md border border-[#ece7f5] min-h-[calc(100vh-13rem)] flex flex-col items-center justify-center gap-3">
          <BookOpen size={32} className="text-slate" />
          <p className="text-sm text-slate font-medium">
            No lesson uploaded for {subject?.name ?? "this subject"} yet.
          </p>
          <p className="text-xs text-slate/70">Check back later for new lessons.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onTopicClick?.(topic)}
              className="bg-white rounded-md border border-[#ece7f5] overflow-hidden hover:border-violet/30 hover:shadow-md transition-all cursor-pointer"
            >
              {topic.coverImage ? (
                <img
                  src={topic.coverImage}
                  alt={topic.title}
                  className="w-full h-45 object-cover"
                />
              ) : (
                <div className="w-full h-45 bg-paper flex items-center justify-center border-b border-[#ece7f5]">
                  <BookOpen size={32} className="text-slate/40" />
                </div>
              )}

              <div className="p-4 h-45 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet/10 text-violet truncate">
                    {topic.subject?.name ?? "General"}
                  </span>
                  <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                    Approved
                  </span>
                </div>

                <h3 className="font-sora font-semibold text-base text-ink mt-3 truncate">
                  {topic.title}
                </h3>

                <div className="flex items-center gap-2 mt-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 text-xs font-semibold">
                    {(topic.teacher?.name ?? topic.teacherName ?? "?")[0]?.toUpperCase()}
                  </div>
                  <p className="text-md text-slate truncate">
                    {topic.teacher?.name ?? topic.teacherName ?? "Unknown"}
                  </p>
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-violet bg-violet/10 hover:bg-violet/20 transition-colors cursor-pointer">
                  Start Lesson
                  <PlayCircle size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentSubjectTopicsView;
