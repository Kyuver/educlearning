import { Bell, CheckCircle2, Megaphone } from "lucide-react";
import { useNotification } from "../../../store/useComponent";

function StudentHomeView() {
  const notification = useNotification((s) => s.notification);
  const setNotification = useNotification((s) => s.setNotification);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet">
            <span className="text-slate">Section:</span> Grade 7 - St. Peter
          </span>
          <div className="relative z-50">
            <button
              onClick={() => setNotification(!notification)}
              className="relative w-11 h-11 flex items-center justify-center text-ink hover:rounded-full transition-colors cursor-pointer"
            >
              <Bell size={22} />
              <span className="absolute top-1 right-2 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                0
              </span>
            </button>
            {notification && (
              <div className="absolute top-12 right-0 w-[340px] max-w-[90vw] bg-[#fdfcff] rounded-md border border-[#e9e2f5] shadow-lg shadow-[#2a2049]/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#e9e2f5] bg-white">
                  <div>
                    <h3 className="font-semibold text-ink text-sm">Quiz reminders</h3>
                    <p className="text-xs text-slate mt-0.5">You're all caught up</p>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#ece7f5]">
                  <div className="py-12 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-paper flex items-center justify-center">
                      <CheckCircle2 size={24} className="text-slate" />
                    </div>
                    <p className="text-sm text-slate font-medium">No pending quizzes</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-slate mt-6">
          Select a subject from the sidebar to view its lessons.
        </p>
      </div>

      <div className="bg-white rounded-md border border-[#ece7f5] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece7f5]">
          <div className="flex items-center gap-2">
            <Megaphone size={18} className="text-violet" />
            <h2 className="font-sora font-semibold text-ink">Announcements</h2>
          </div>
          <span className="text-xs font-semibold text-slate">0 new</span>
        </div>
        <div className="flex items-center gap-4 px-6 py-5">
          <div className="w-11 h-11 rounded-full bg-paper flex items-center justify-center shrink-0">
            <Megaphone size={20} className="text-slate" />
          </div>
          <div>
            <p className="text-sm text-slate font-medium">No announcements yet</p>
            <p className="text-xs text-slate/70 mt-0.5">New course updates and notices will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHomeView;
