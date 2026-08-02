import { create } from 'zustand';

export const useNotification = create((set) => ({
  notification: false,
  notifications: [],
  unread: 0,

  setNotification: (notification) => set({ notification }),

  setNotifications: (notifications) => set({
    notifications,
    unread: notifications.filter((n) => n.status === "UNREAD").length,
  }),

  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
    unread: state.unread + (notification.status === "UNREAD" ? 1 : 0),
  })),

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, status: "READ" } : n
    ),
    unread: Math.max(0, state.unread - 1),
  })),

  clearAll: () => set({ notifications: [], unread: 0 }),
}));
