import { LogOut } from "lucide-react";


function ConfirmLogoutModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-none px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl ring-1 ring-black/5">
        <div className="px-6 pt-6 pb-2">
          <div className="w-11 h-11 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
            <LogOut size={20} strokeWidth={2.25} />
          </div>
          <h3 className="text-base font-semibold text-ink">Log out of your account?</h3>
          <p className="text-sm text-slate mt-1.5 leading-relaxed">
            You'll need to sign in again to access your dashboard.
          </p>
        </div>

        <div className="flex justify-end gap-2 px-6 py-5">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate hover:bg-paper transition-colors cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-colors cursor-pointer shadow-sm shadow-red-500/20"
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
