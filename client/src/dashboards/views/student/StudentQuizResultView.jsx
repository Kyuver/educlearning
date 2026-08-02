import { CheckCircle2, XCircle } from "lucide-react";
import { useQuiz } from "@/store";

function StudentQuizResultView({ score, onBack }) {
  const { currentQuiz, answers } = useQuiz();
  const questions = currentQuiz?.questions ?? [];
  const total = questions.length;

  return (
    <div className="bg-white rounded-md border border-[#ece7f5] p-6 max-w-md">
      <CheckCircle2 size={40} className="text-violet mx-auto mb-3" />
      <h2 className="font-sora font-semibold text-lg text-ink text-center">Quiz result</h2>
      <p className="text-sm text-slate mt-2 text-center">You scored {score} out of {total}.</p>

      <div className="mt-6 space-y-3">
        {questions.map((question, qi) => {
          const submitted = answers[question.id];
          const correct = submitted === question.correctAnswer;
          const answered = submitted !== undefined;
          return (
            <div key={question.id} className="rounded-lg border border-[#ece7f5] p-3">
              <div className="flex items-start gap-2">
                {answered ? (
                  correct ? (
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                  )
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate/30 mt-0.5 shrink-0" />
                )}
                <p className="text-sm font-medium text-ink">
                  {qi + 1}. {question.question}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6">
                {(question.choices ?? []).map((choice, ci) => (
                  <span
                    key={ci}
                    className={
                      "text-xs px-3 py-1.5 rounded-lg border " +
                      (ci === question.correctAnswer
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : ci === submitted
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-[#ece7f5] text-slate")
                    }
                  >
                    {choice}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="mt-6 w-full px-5 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
      >
        Back to lesson
      </button>
    </div>
  );
}

export default StudentQuizResultView;