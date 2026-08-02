import { useState } from "react";
import { ArrowLeft, X, CheckCircle2, Trash2, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useShowModal } from "@/store";
import { useGetIdByTopic } from "@/store/addQuiz";
import { create } from "../../../lib/api";

const BLANK_QUESTION = { question: "", choices: ["", "", "", ""], correct: 0 };

function AddQuizFormModal({ topic }) {
  const { closeModal } = useShowModal();
  const { topicId } = useGetIdByTopic();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ ...BLANK_QUESTION }]);
  const [saving, setSaving] = useState(false);

  const updateQuestion = (index, patch) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, ...patch } : q))
    );
  };

  const updateChoice = (qIndex, cIndex, value) => {
    updateQuestion(qIndex, {
      choices: questions[qIndex].choices.map((c, i) => (i === cIndex ? value : c)),
    });
  };

  const addQuestion = () => setQuestions((prev) => [...prev, { ...BLANK_QUESTION }]);
  const removeQuestion = (index) =>
    setQuestions((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    const quizId = topic?.id ?? topicId;
    if (!quizId) return;
    setSaving(true);
    try {
      const created = await create("quiz", { title, topicId: Number(quizId) });
      const createdQuizId = created.data.id;
      for (const q of questions) {
        if (!q.question.trim() || q.choices.some((c) => !c.trim())) continue;
        await create("question", {
          quizId: createdQuizId,
          question: q.question,
          choices: q.choices,
          correctAnswer: q.correct,
        });
      }
      queryClient.invalidateQueries();
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
      <div
        className="bg-white rounded-xl w-full max-w-4xl shadow-xl flex flex-col overflow-hidden"
        style={{ height: "80vh" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={closeModal} className="text-slate hover:text-ink cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h3 className="font-semibold text-ink text-base">Add Quiz — {topic?.title ?? "Topic"}</h3>
          </div>
          <button onClick={closeModal} className="text-slate hover:text-ink cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">
              Quiz Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none"
              placeholder="Enter quiz title..."
            />
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border border-[#ece7f5] rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-slate uppercase tracking-wide">
                    Question {qIndex + 1}
                  </label>
                  <textarea
                    value={q.question}
                    onChange={(e) => updateQuestion(qIndex, { question: e.target.value })}
                    className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none"
                    rows={2}
                    placeholder="e.g. What is 1/2 + 1/4?"
                  />
                </div>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="mt-6 text-red-400 hover:text-red-600 cursor-pointer shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="mt-3">
                <label className="text-xs font-semibold text-slate uppercase tracking-wide">
                  Choices
                </label>
                <p className="text-xs text-slate mt-0.5 mb-2">
                  Select the radio of the correct answer.
                </p>
                {q.choices.map((choice, cIndex) => (
                  <div
                    key={cIndex}
                    className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2"
                  >
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correct === cIndex}
                      onChange={() => updateQuestion(qIndex, { correct: cIndex })}
                      className="accent-violet shrink-0"
                    />
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) => updateChoice(qIndex, cIndex, e.target.value)}
                      className="flex-1 text-sm outline-none"
                      placeholder={`Choice ${cIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[#ece7f5] text-sm font-semibold text-violet hover:bg-violet/5 cursor-pointer"
          >
            <Plus size={16} /> Add Question
          </button>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5] shrink-0">
          <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <CheckCircle2 size={16} /> {saving ? "Saving..." : "Save Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddQuizFormModal;
