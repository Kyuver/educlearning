import { useShowModal } from "@/store/showModal";
import { X } from "lucide-react";

function AdminTopicReviewModal() {

  const { closeModal } = useShowModal()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#ece7f5]">
          <h3 className="font-semibold text-ink text-lg">Topic review</h3>
          <button onClick={closeModal} className="text-slate hover:text-ink transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="h-36 rounded-lg overflow-hidden">
            <img
              src="https://picsum.photos/seed/topic/400/300"
              alt="Topic"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text-ink">Topic Title</h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-violet bg-violet/10 shrink-0">
              Subject Name
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-violet uppercase tracking-wide">Explanation</p>
            <p className="text-sm text-slate mt-1 leading-relaxed whitespace-pre-wrap">Topic explanation goes here.</p>
          </div>
          <p className="text-xs text-slate">
            Uploaded by <span className="font-medium text-ink">Teacher Name</span>
          </p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
          <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 cursor-pointer">
            Decline
          </button>
          <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600 cursor-pointer">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminTopicReviewModal;
