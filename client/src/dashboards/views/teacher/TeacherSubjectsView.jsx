import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bell, Plus, Mail } from "lucide-react";
import { useNotification, useSection, useShowModal, MODAL } from "../../../store/useComponent";
import { fetchUserNotifications } from "../../../lib/api";

function TeacherSubjectsView() {
  const notification = useNotification((s) => s.notification);
  const setNotification = useNotification((s) => s.setNotification);
  const section = useSection((s) => s.section);
  const setSection = useSection((s) => s.setSection);
  const setModal = useShowModal((s) => s.setModal);
  const [params] = useSearchParams();
  const teacherId = Number(params.get("id") ?? 0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (teacherId) {
      fetchUserNotifications(teacherId).then(setNotifications);
    }
  }, [teacherId]);

  const unread = notifications.filter((n) => n.status === "UNREAD").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet">
          <span className="text-slate">Section:</span> Grade 7 - St. Peter
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModal(MODAL.TEACHER_ADD_TOPIC)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
          >
            <Plus size={17} /> Add Topic
          </button>
          <div className="relative z-50">
            <button
              onClick={() => setNotification(!notification)}
              className="relative w-11 h-11 flex items-center justify-center text-ink hover:rounded-full transition-colors cursor-pointer"
            >
              <Bell size={22} />
              {unread > 0 && (
                <span className="absolute top-1 right-2 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
            {notification && (
              <div className="absolute top-12 right-0 w-[340px] max-w-[90vw] bg-[#fdfcff] rounded-md border border-[#e9e2f5] shadow-lg shadow-[#2a2049]/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#e9e2f5] bg-white">
                  <div>
                    <h3 className="font-semibold text-ink text-sm">Notifications</h3>
                    <p className="text-xs text-slate mt-0.5">
                      {unread === 0 ? "You're all caught up" : `${unread} unread`}
                    </p>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#ece7f5]">
                  {notifications.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-paper flex items-center justify-center">
                        <Bell size={24} className="text-slate" />
                      </div>
                      <p className="text-sm text-slate font-medium">No new notifications</p>
                      <p className="text-xs text-slate/70">New updates will appear here.</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex items-start gap-3 px-4 py-3 ${n.status === "UNREAD" ? "bg-violet/5" : "bg-transparent"}`}
                      >
                        <div className="w-9 h-9 rounded-full bg-violet/10 flex items-center justify-center shrink-0">
                          {n.type === "INVITATION" ? (
                            <Mail size={16} className="text-violet" />
                          ) : (
                            <Bell size={16} className="text-violet" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-ink">{n.title}</p>
                          <p className="text-xs text-slate mt-0.5">{n.message}</p>
                          <p className="text-[11px] text-slate/60 mt-1">
                            {n.sender?.name ?? "Admin"} · {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {n.status === "UNREAD" && (
                          <span className="w-2 h-2 rounded-full bg-violet shrink-0 mt-1.5" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-6 border-b border-[#ece7f5]">
        {["approved", "pending", "denied"].map((st) => (
          <button
            key={st}
            onClick={() => setSection(st)}
            className={`pb-2 text-sm font-semibold capitalize cursor-pointer relative transition-colors ${section === st ? "text-ink" : "text-slate hover:text-ink"}`}
          >
            {st}
            {section === st && <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-violet rounded-full" />}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <p className="text-sm text-slate col-span-4 py-10 text-center">No {section} topics yet.</p>
      </div>
    </div>
  );
}

export default TeacherSubjectsView;
