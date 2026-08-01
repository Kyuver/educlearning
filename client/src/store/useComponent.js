import { create } from 'zustand'

export const MODAL = {
  ADMIN_ADD_TOPIC: "AdminAddTopicModal",
  ADMIN_TOPIC_REVIEW: "AdminTopicReviewModal",
  ADMIN_INVITE_TEACHER: "AdminInviteTeacherModal",
  ADD_QUIZ: "AddQuizFormModal",
  TEACHER_ADD_TOPIC: "TeacherAddTopicModal",
  TEACHER_EDIT_TOPIC: "TeacherEditTopicModal",
  TEACHER_DELETE_TOPIC: "TeacherDeleteTopicModal",
  CONFIRM_LOGOUT: "ConfirmLogoutModal",
};

export const useShowModal = create((set) => ({
  modal: null,
  modalData: null,
  setModal: (modal, data = null) => set({ modal, modalData: data }),
  closeModal: () => set({ modal: null, modalData: null }),
}));

export const useNotification = create((set) => ({
  notification: false,
  setNotification: (notification) => set({ notification }),
}));

export const useSection = create((set) => ({
  section: "approved",
  setSection: (section) => set({ section }),
}));

export const useView = create((set) => ({
  view: "dashboard",
  setView: (view) => set({ view }),
}));
