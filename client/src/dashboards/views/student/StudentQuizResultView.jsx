import { CheckCircle2 } from "lucide-react";

function StudentQuizResultView() {
  return (
    <div className="bg-white rounded-md border border-[#ece7f5] p-6 max-w-md text-center">
      <CheckCircle2 size={40} className="text-violet mx-auto mb-3" />
      <h2 className="font-sora font-semibold text-lg text-ink">Quiz result</h2>
      <p className="text-sm text-slate mt-2">You scored 0 out of 0.</p>
      <button className="mt-4 px-5 py-2.5 rounded-lg border border-[#ece7f5] text-sm font-semibold text-ink hover:bg-paper cursor-pointer">
        Back to lesson
      </button>
    </div>
  );
}

export default StudentQuizResultView;
