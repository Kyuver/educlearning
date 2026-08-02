import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen } from "lucide-react";
import { fetchTopicQuizzes } from "../../../lib/api";

function AdminTopicDetailView({ topic, onBack }) {
  const { data: quizzes = [], isLoading } = useQuery({
    queryKey: ["quizzes", topic?.id],
    queryFn: () => fetchTopicQuizzes(topic?.id),
    enabled: !!topic?.id,
  });

  const paragraphs = (topic?.content || "No explanation provided.")
    .split(/\n+/)
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="cursor-pointer text-ink hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-sora font-semibold text-xl text-ink">{topic?.title ?? "Topic"}</h2>
          <p className="text-sm text-slate mt-0.5">{topic?.subject?.name ?? "Subject"}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#ece7f5] p-6">
        <p className="text-xs font-semibold text-violet uppercase tracking-wide">
          <BookOpen size={14} className="inline -mt-0.5 mr-1.5" />
          Explanation
        </p>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-slate mt-3 leading-relaxed whitespace-pre-wrap">
            {p}
          </p>
        ))}
      </div>

      <div>
        <h3 className="font-sora font-semibold text-lg text-ink mb-3">
          Quizzes ({quizzes.length})
        </h3>
        {isLoading ? (
          <p className="text-sm text-slate">Loading...</p>
        ) : quizzes.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#ece7f5] p-8 text-center">
            <p className="text-sm text-slate font-medium">No quizzes for this topic yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-xl border border-[#ece7f5] p-5"
              >
                <h4 className="font-sora font-semibold text-base text-ink">{quiz.title}</h4>
                <div className="mt-4 space-y-4">
                  {quiz.questions.map((q, qi) => (
                    <div key={q.id}>
                      <p className="text-sm font-medium text-ink">
                        {qi + 1}. {q.question}
                      </p>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(q.choices ?? []).map((choice, ci) => (
                          <span
                            key={ci}
                            className={
                              "text-sm px-3 py-2 rounded-lg border " +
                              (ci === q.correctAnswer
                                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                : "border-[#ece7f5] text-slate")
                            }
                          >
                            {choice}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTopicDetailView;
