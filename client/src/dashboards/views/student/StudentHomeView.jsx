import { useQuery } from "@tanstack/react-query";
import { Megaphone, BookOpen, ChevronRight } from "lucide-react";
import { fetchTopics } from "../../../lib/api";

function StudentHomeView({ onOpenTopic }) {
  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["topics", "APPROVED"],
    queryFn: () => fetchTopics("APPROVED"),
    select: (data) => data.filter((t) => t.teacherId),
  });

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate mt-6">
        Select a subject from the sidebar, or open an announcement below.
      </p>

      <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5]">
          <div className="flex items-center gap-2">
            <Megaphone size={18} className="text-violet" />
            <h2 className="font-sora font-semibold text-ink">Announcements</h2>
          </div>
          <span className="text-xs font-semibold text-slate">{topics.length} new</span>
        </div>

        {isLoading ? (
          <p className="text-sm text-slate px-6 py-8">Loading announcements...</p>
        ) : topics.length === 0 ? (
          <div className="flex items-center gap-4 px-6 py-5">
            <div className="w-11 h-11 rounded-full bg-paper flex items-center justify-center shrink-0">
              <Megaphone size={20} className="text-slate" />
            </div>
            <div>
              <p className="text-sm text-slate font-medium">No announcements yet</p>
              <p className="text-xs text-slate/70 mt-0.5">New course updates and notices will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[#ece7f5]">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onOpenTopic?.(topic)}
                className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-paper transition-colors cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-violet/10 flex items-center justify-center shrink-0">
                  <BookOpen size={20} className="text-violet" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink truncate">{topic.title}</p>
                  <p className="text-xs text-slate truncate mt-0.5">
                    {topic.subject?.name ?? "Subject"} · {topic.teacher?.name ?? "Teacher"}
                  </p>
                </div>
                <ChevronRight size={16} className="text-slate shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentHomeView;