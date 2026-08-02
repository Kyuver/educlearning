import { LogOut } from "lucide-react";

function ConfirmLogoutModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-none px-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl ring-1 ring-black/5">
        <div className="px-8 pt-8 pb-3">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-5">
            <LogOut size={24} strokeWidth={2.25} />
          </div>
          <h3 className="text-lg font-semibold text-ink">Log out of your account?</h3>
          <p className="text-sm text-slate mt-2 leading-relaxed">
            You'll need to sign in again to access your dashboard.
          </p>
        </div>
        <div className="flex justify-end gap-2 px-8 py-6">
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate hover:bg-paper transition-colors cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-colors cursor-pointer shadow-sm shadow-red-500/20"
            onClick={onConfirm}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmLogoutModal;
