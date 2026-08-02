import { ArrowLeft } from "lucide-react";

function StudentQuizView({ onBack, onSubmit }) {
  return (
    <div className="bg-white rounded-md border border-[#ece7f5] p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate hover:text-ink text-sm mb-4 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to lesson
      </button>
      <h2 className="font-sora font-semibold text-lg text-ink mb-4">Topic quiz</h2>
      <div className="mb-5">
        <p className="text-sm font-medium text-ink mb-2">Question text goes here.</p>
        <label className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2 cursor-pointer hover:bg-paper">
          <input type="radio" name="q-1" className="accent-violet" />
          <span className="text-sm text-ink">Choice A</span>
        </label>
        <label className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2 cursor-pointer hover:bg-paper">
          <input type="radio" name="q-1" className="accent-violet" />
          <span className="text-sm text-ink">Choice B</span>
        </label>
        <label className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2 cursor-pointer hover:bg-paper">
          <input type="radio" name="q-1" className="accent-violet" />
          <span className="text-sm text-ink">Choice C</span>
        </label>
      </div>
      <button
        onClick={onSubmit}
        className="px-5 py-2.5 rounded-lg bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
      >
        Submit quiz
      </button>
    </div>
  );
}

export default StudentQuizView;
