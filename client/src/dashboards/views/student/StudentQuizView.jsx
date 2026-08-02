import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useQuiz } from "@/store";
import { useSearchParams } from "react-router-dom";
import { create } from "../../../lib/api";

function StudentQuizView({ onBack, onFinish }) {
  const { currentQuiz, answers, setAnswer } = useQuiz();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);

  const questions = currentQuiz?.questions ?? [];

  const handleSubmit = async () => {
    if (!currentQuiz || !userId) return;
    setSubmitting(true);
    try {
      const score = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
      await create("quizAttempt", {
        userId: Number(userId),
        quizId: currentQuiz.id,
        score,
        totalQuestion: questions.length,
        submittedAnswers: answers,
      });
      queryClient.invalidateQueries();
      onFinish?.(score);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-md border border-[#ece7f5] p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate hover:text-ink text-sm mb-4 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to lesson
      </button>
      <h2 className="font-sora font-semibold text-lg text-ink mb-4">{currentQuiz?.title ?? "Topic quiz"}</h2>

      {questions.map((question, qi) => (
        <div key={question.id} className="mb-6">
          <p className="text-sm font-medium text-ink mb-2">
            {qi + 1}. {question.question}
          </p>
          {(question.choices ?? []).map((choice, ci) => (
            <label
              key={ci}
              className={
                "flex items-center gap-3 border rounded-lg px-4 py-3 mb-2 cursor-pointer hover:bg-paper " +
                (answers[question.id] === ci ? "border-violet bg-violet/5" : "border-[#ece7f5]")
              }
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={answers[question.id] === ci}
                onChange={() => setAnswer(question.id, ci)}
                className="accent-violet"
              />
              <span className="text-sm text-ink">{choice}</span>
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="px-5 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit quiz"}
      </button>
    </div>
  );
}

export default StudentQuizView;