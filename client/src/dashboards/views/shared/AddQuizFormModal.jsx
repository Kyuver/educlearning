import { ArrowLeft, X, CheckCircle2 } from "lucide-react";
import { useShowModal } from "@/store";

function AddQuizFormModal({ topic }) {
  const { closeModal } = useShowModal();

  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
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

        <div className="flex-1 px-6 py-4 space-y-4 overflow-hidden">
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">
              Quiz Title
            </label>
            <input
              type="text"
              className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none"
              placeholder="Enter quiz title..."
            />
          </div>

          <div className="border-t border-[#ece7f5] pt-4">
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">
              Question
            </label>
            <textarea
              className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none"
              rows={2}
              placeholder="e.g. What is 1/2 + 1/4?"
            />

            <div className="mt-3">
              <label className="text-xs font-semibold text-slate uppercase tracking-wide">
                Choices
              </label>
              <p className="text-xs text-slate mt-0.5 mb-2">
                Select the radio of the correct answer.
              </p>
              <div className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2">
                <input type="radio" name="modalCorrectChoice" className="accent-violet shrink-0" />
                <input
                  type="text"
                  className="flex-1 text-sm outline-none"
                  placeholder="Choice 1"
                />
              </div>
              <div className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2">
                <input type="radio" name="modalCorrectChoice" className="accent-violet shrink-0" />
                <input
                  type="text"
                  className="flex-1 text-sm outline-none"
                  placeholder="Choice 2"
                />
              </div>
              <div className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2">
                <input type="radio" name="modalCorrectChoice" className="accent-violet shrink-0" />
                <input
                  type="text"
                  className="flex-1 text-sm outline-none"
                  placeholder="Choice 3"
                />
              </div>
              <div className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2">
                <input type="radio" name="modalCorrectChoice" className="accent-violet shrink-0" />
                <input
                  type="text"
                  className="flex-1 text-sm outline-none"
                  placeholder="Choice 4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5] shrink-0">
          <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer flex items-center gap-2">
            <CheckCircle2 size={16} /> Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddQuizFormModal;
