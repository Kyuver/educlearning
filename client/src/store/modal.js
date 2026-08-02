import { create } from 'zustand'

export const MODAL = {
  ADMIN_ADD_TOPIC: "AdminAddTopicModal",
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
