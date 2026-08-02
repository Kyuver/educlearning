import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Bell, Plus, Mail, BookOpen, Check, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { fetchUserNotifications, fetchUserInvitations, fetchTopics, fetchSubjectTopics, markNotificationsRead } from "../../../lib/api";
import { useRespondInvitation } from "../../../hooks/useMutations";
import { MODAL, useNotification, useSection } from "@/store";
import { useShowModal } from "@store";

function TopicCard({ topic, onClick }) {
  return (
    <div
      key={topic.id}
      className="bg-white rounded-md border border-[#ece7f5] overflow-hidden hover:border-violet/30 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      {topic.coverImage ? (
        <img
          src={topic.coverImage}
          alt={topic.title}
          className="w-full h-45 object-cover"
        />
      ) : (
        <div className="w-full h-45 bg-paper flex items-center justify-center border-b border-[#ece7f5]">
          <BookOpen size={32} className="text-slate/40" />
        </div>
      )}

      <div className="p-4 h-45 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet/10 text-violet truncate">
            {topic.subject?.name ?? "General"}
          </span>
          {/* <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${topic.status === "approved" ? "bg-emerald-50 text-emerald-600" : topic.status === "denied" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
            {topic.status}
          </span>*/}
        </div>

        <h3 className="font-sora font-semibold text-base text-ink mt-3 truncate">
          {topic.title}
        </h3>

        <div className="flex items-center gap-2 mt-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 text-xs font-semibold">
            {(topic.teacher?.name ?? topic.teacherName ?? "?")[0]?.toUpperCase()}
          </div>
          <p className="text-md text-slate truncate">
            {topic.teacher?.name ?? topic.teacherName ?? "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}

function TeacherSubjectsView({ selectedSubjectId, onTopicClick }) {
  const { notification, notifications, unread, setNotification, setNotifications, markAllRead } = useNotification();
  const {section, setSection} = useSection()
  const { setModal } = useShowModal();
  const respondInvitation = useRespondInvitation();

  const [params] = useSearchParams();
  const teacherId = Number(params.get("id") ?? 0);

  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["topics", section, selectedSubjectId],
    queryFn: () => selectedSubjectId
      ? fetchSubjectTopics(selectedSubjectId, "APPROVED")
      : fetchTopics(section.toUpperCase()),
    enabled: !!teacherId,
  });

  const { data: invitations = [] } = useQuery({
    queryKey: ["invitations", teacherId],
    queryFn: () => fetchUserInvitations(teacherId),
    enabled: !!teacherId,
  });

  const pendingInvitations = invitations.filter((i) => i.status === "PENDING");

  useEffect(() => {
    if (teacherId) {
      fetchUserNotifications(teacherId).then(setNotifications);
    }
  }, [teacherId, setNotifications]);

  const toggleNotification = () => {
    const next = !notification;
    setNotification(next);
    if (next && teacherId) {
      markNotificationsRead(teacherId).then(() => markAllRead());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet">
          <span className="text-slate">Section:</span> Grade 7 - St. Peter
        </span>
        <div className="flex items-center gap-3">
          {selectedSubjectId && (
            <button
              type="button"
              onClick={() => setModal(MODAL.TEACHER_ADD_TOPIC, selectedSubjectId)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
            >
              <Plus size={17} /> Add Topic
            </button>
          )}
          <div className="relative z-50">
            <button
              onClick={toggleNotification}
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
              <div className="absolute top-12 right-0 w-[360px] max-w-[90vw] bg-[#fdfcff] rounded-md border border-[#e9e2f5] shadow-lg shadow-[#2a2049]/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#e9e2f5] bg-white">
                  <div>
                    <h3 className="font-semibold text-ink text-sm">Notifications</h3>
                    <p className="text-xs text-slate mt-0.5">
                      {unread === 0 ? "You're all caught up" : `${unread} unread`}
                    </p>
                  </div>
                </div>

                {pendingInvitations.length > 0 && (
                  <div className="border-b border-[#e9e2f5] bg-violet/5">
                    <p className="px-4 py-2 text-[11px] font-semibold text-violet uppercase tracking-wide">
                      Pending invitations
                    </p>
                    <div className="px-4 pb-3 space-y-2">
                      {pendingInvitations.map((inv) => (
                        <div key={inv.id} className="rounded-lg border border-[#ece7f5] bg-white p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-violet/10 flex items-center justify-center shrink-0">
                              <Mail size={14} className="text-violet" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-ink truncate">{inv.courseName}</p>
                              <p className="text-xs text-slate truncate">
                                {inv.topic?.subject?.name ?? "Course"} · from {inv.sentBy?.name ?? "Admin"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2.5">
                            <button
                              onClick={() => respondInvitation.mutate({ id: inv.id, action: "accept" })}
                              disabled={respondInvitation.isPending}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <Check size={13} /> Accept
                            </button>
                            <button
                              onClick={() => respondInvitation.mutate({ id: inv.id, action: "decline" })}
                              disabled={respondInvitation.isPending}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <X size={13} /> Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
      {!selectedSubjectId && (
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
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-h-[300px]">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-violet border-t-transparent rounded-full animate-spin" />
          </div>
        ) : topics.length === 0 ? (
          <p className="text-sm text-slate col-span-full py-10 text-center min-h-[300px] flex items-center justify-center">
            No {selectedSubjectId ? "approved" : section} topics yet.
          </p>
        ) : (
          topics.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={() => {
            onTopicClick?.(topic)
          }} />)
        )}
      </div>
    </div>
  );
}

export default TeacherSubjectsView;
