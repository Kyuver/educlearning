import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, CheckCircle2, XCircle, ClipboardList } from "lucide-react";
import { fetchTopicQuizzes, fetchUserQuizAttempts } from "../../../lib/api";

function getQuizStatus(quiz, attempts) {
  const attempt = attempts.find((a) => a.quizId === quiz.id);
  if (!attempt) return "neutral";
  const submitted = attempt.submittedAnswers ?? {};
  const total = quiz.questions.length;
  const correct = quiz.questions.filter((q) => submitted[q.id] === q.correctAnswer).length;
  return correct === total ? "correct" : "incorrect";
}

const STATUS_STYLES = {
  correct: "border-emerald-300 bg-emerald-50",
  incorrect: "border-red-300 bg-red-50",
  neutral: "border-[#ece7f5] bg-white",
};

function QuizCard({ quiz, attempts, onTakeQuiz }) {
  const status = getQuizStatus(quiz, attempts);
  const attempt = attempts.find((a) => a.quizId === quiz.id);
  const Icon = status === "correct" ? CheckCircle2 : status === "incorrect" ? XCircle : ClipboardList;

  return (
    <button
      type="button"
      onClick={() => onTakeQuiz(quiz)}
      className={
        "w-full flex items-center justify-between gap-3 rounded-lg border p-4 text-left hover:shadow-sm transition-all cursor-pointer " +
        STATUS_STYLES[status]
      }
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon
          size={20}
          className={
            status === "correct"
              ? "text-emerald-600 shrink-0"
              : status === "incorrect"
                ? "text-red-600 shrink-0"
                : "text-slate shrink-0"
          }
        />
        <span className="text-sm font-semibold text-ink truncate">{quiz.title}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {status !== "neutral" && (
          <span
            className={
              "text-xs font-semibold px-2 py-0.5 rounded-full " +
              (status === "correct" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")
            }
          >
            {attempt?.score}/{attempt?.totalQuestion}
          </span>
        )}
        <span className="text-xs font-semibold text-violet bg-violet/10 px-3 py-1.5 rounded-lg">
          {status === "neutral" ? "Take Quiz" : "Retake"}
        </span>
      </div>
    </button>
  );
}

function StudentTopicDetailView({ topic, onBack, onTakeQuiz }) {
  const [params] = useSearchParams();
  const userId = params.get("id");

  const { data: quizzes = [], isLoading } = useQuery({
    queryKey: ["quizzes", topic?.id],
    queryFn: () => fetchTopicQuizzes(topic?.id),
    enabled: !!topic?.id,
  });

  const { data: attempts = [] } = useQuery({
    queryKey: ["attempts", "user", userId],
    queryFn: () => fetchUserQuizAttempts(userId),
    enabled: !!userId,
  });

  return (
    <div className="space-y-6">
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
        </div>
      </div>

      <div>
        <h3 className="font-sora font-semibold text-lg text-ink mb-3">
          Quizzes ({quizzes.length})
        </h3>
        {isLoading ? (
          <p className="text-sm text-slate">Loading quizzes...</p>
        ) : quizzes.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#ece7f5] p-8 text-center">
            <p className="text-sm text-slate font-medium">No quizzes for this topic yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} attempts={attempts} onTakeQuiz={onTakeQuiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentTopicDetailView;