import { AlertTriangle } from "lucide-react";

function ConfirmDeleteModal({
  open,
  title = "Delete file",
  message = "This will delete all files since you last saved",
  confirmLabel = "Delete",
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-sm p-8 flex flex-col items-center text-center shadow-xl">
        {/* Warning icon */}
        <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-5">
          <AlertTriangle size={26} className="text-white" fill="white" strokeWidth={0} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-ink">{title}</h2>

        {/* Message */}
        <p className="text-slate text-sm mt-2 leading-relaxed">{message}</p>

        {/* Buttons */}
        <div className="flex gap-3 w-full mt-7">
          <button
            className="flex-1 py-3 rounded-xl bg-paper text-ink text-sm font-semibold hover:bg-[#ece7f5] transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
