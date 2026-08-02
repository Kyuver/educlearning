import { useQuery } from "@tanstack/react-query";
import { useGetIdByTopic } from "@/store/addQuiz";
import { useView, useShowModal } from "@store";
import { ArrowLeft, Plus, CheckCircle2, XCircle, Users } from "lucide-react";
import { fetchTopicQuizzes, fetchQuizAttempts } from "../../../lib/api";

function AttemptList({ quiz }) {
  const { data: attempts = [], isLoading } = useQuery({
    queryKey: ["attempts", quiz.id],
    queryFn: () => fetchQuizAttempts(quiz.id),
  });

  if (isLoading) return <p className="text-sm text-slate py-3">Loading attempts...</p>;

  if (attempts.length === 0) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate/70 py-2">
        <Users size={14} /> No student has taken this quiz yet.
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-[#ece7f5] pt-3 space-y-3">
      <p className="text-xs font-semibold text-slate uppercase tracking-wide">
        Student answers ({attempts.length})
      </p>
      {attempts.map((attempt) => (
        <div key={attempt.id} className="rounded-lg bg-paper/60 p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">{attempt.user?.name ?? "Student"}</p>
            <span className="text-xs font-semibold text-violet">
              {attempt.score}/{attempt.totalQuestion}
            </span>
          </div>
          <div className="mt-2 space-y-1.5">
            {(attempt.quiz?.questions ?? []).map((question) => {
              const submitted = (attempt.submittedAnswers ?? {})[question.id];
              const correct = submitted === question.correctAnswer;
              const answered = submitted !== undefined;
              return (
                <div key={question.id} className="flex items-center gap-2 text-xs">
                  {answered ? (
                    correct ? (
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle size={13} className="text-red-500 shrink-0" />
                    )
                  ) : (
                    <span className="w-[13px] h-[13px] rounded-full border border-slate/30 shrink-0" />
                  )}
                  <span className="text-slate truncate">{question.question}</span>
                  <span className="ml-auto shrink-0 text-slate/70">
                    {answered ? (question.choices ?? [])[submitted] ?? "—" : "Not answered"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function TeacherTopicQuizzesView({ topic, onBack }) {
  const { setView } = useView();
  const { setModal } = useShowModal();
  const { setTopicId } = useGetIdByTopic();

  const { data: quizzes = [], isLoading } = useQuery({
    queryKey: ["quizzes", topic?.id],
    queryFn: () => fetchTopicQuizzes(topic?.id),
    enabled: !!topic?.id,
  });

  const handleBack = () => {
    if (onBack) onBack();
    setView("dashboard");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="cursor-pointer" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h4 className="text-lg font-sora font-semibold text-ink">{topic?.title ?? "Topic"}</h4>
            <p className="text-sm text-slate">Lesson {topic.id}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setTopicId(topic.id);
            setModal("AddQuizFormModal");
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer shrink-0"
        >
          <Plus size={18} /> Add Quiz
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#ece7f5] p-5">
        <p className="text-xs font-semibold text-violet uppercase tracking-wide">Explanation</p>
        <p className="text-sm text-slate mt-2 leading-relaxed whitespace-pre-wrap">{topic.content}</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-slate text-center py-10">Loading quizzes...</p>
        ) : quizzes.length === 0 ? (
          <p className="text-sm text-slate text-center py-10">No quizzes yet.</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-xl border border-[#ece7f5] p-5">
              <h4 className="font-sora font-semibold text-base text-ink">{quiz.title}</h4>
              <div className="mt-3 space-y-2">
                {quiz.questions.map((question, qi) => (
                  <div key={question.id} className="text-sm">
                    <p className="font-medium text-ink">
                      {qi + 1}. {question.question}
                    </p>
                    <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(question.choices ?? []).map((choice, ci) => (
                        <span
                          key={ci}
                          className={
                            "text-sm px-3 py-2 rounded-lg border " +
                            (ci === question.correctAnswer
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
              <AttemptList quiz={quiz} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeacherTopicQuizzesView;
