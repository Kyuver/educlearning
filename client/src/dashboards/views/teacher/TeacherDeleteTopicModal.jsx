import { AlertTriangle } from "lucide-react";
import { useShowModal } from "../../../store/useComponent";

function TeacherDeleteTopicModal() {
  const closeModal = useShowModal((s) => s.closeModal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-sm shadow-xl">
        <div className="px-6 py-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-ink">Delete topic</h3>
            <p className="text-sm text-slate mt-2">
              Are you sure you want to delete <span className="font-medium text-ink">Topic Title</span>? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
          <button onClick={closeModal} className="px-4 py-2 rounded-md text-xs font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-md text-xs font-semibold bg-red-500 text-white hover:bg-red-600 cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDeleteTopicModal;
