import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    return Promise.reject(err?.response?.data || err);
  },
);

// ----- generic reads -----

export async function get(table, id) {
  const res = await api.get(id ? `/api/${table}/${id}` : `/api/${table}`);
  return res.data;
}

export async function getByStatus(table, status) {
  const res = await api.get(`/api/${table}/${status}`);
  return res.data;
}

// ----- subjects -----

export async function fetchSubjects() {
  const res = await api.get("/api/subject");
  return res.data;
}

export async function fetchSubject(subjectId) {
  const res = await api.get(`/api/subject/${subjectId}`);
  return res.data;
}

// subject + its topics, filtered by status on the SERVER
export async function fetchSubjectTopics(subjectId, status) {
  const res = await api.get(
    status
      ? `/api/subject/${subjectId}/topics/${status}`
      : `/api/subject/${subjectId}/topics`,
  );
  return res.data;
}

// ----- topics -----

export async function fetchTeacherTopics(teacherId) {
  const res = await api.get(`/api/teacher/${teacherId}/topics`);
  return res.data;
}

export async function fetchTopics(status) {
  const res = await api.get(`/api/topic/${status}`);
  return res.data;
}

export async function fetchTopicQuizzes(topicId) {
  const res = await api.get(`/api/topic/${topicId}/quizzes`);
  return res.data;
}

export async function fetchQuizAttempts(quizId) {
  const res = await api.get(`/api/quiz/${quizId}/attempts`);
  return res.data;
}

export async function fetchUserQuizAttempts(userId) {
  const res = await api.get(`/api/user/${userId}/quiz-attempts`);
  return res.data;
}

// ----- users / notifications -----

export async function fetchUsers(role) {
  const res = await api.get(`/api/user/${role}`);
  return res.data;
}

export async function fetchUnassignedTopics() {
  const res = await api.get("/api/topic/unassigned");
  return res.data;
}

export async function fetchNotifications(status) {
  const res = await api.get(status ? `/api/notification/${status}` : `/api/notification`);
  return res.data;
}

export async function fetchUserNotifications(userId) {
  const res = await api.get(`/api/notification/user/${userId}`);
  return res.data;
}

export async function markNotificationsRead(userId) {
  const res = await api.post(`/api/notification/read/${userId}`);
  return res.data;
}

export async function fetchUserInvitations(userId) {
  const res = await api.get(`/api/invitation/user/${userId}`);
  return res.data;
}

export async function fetchSentInvitations(userId) {
  const res = await api.get(`/api/invitation/sent/${userId}`);
  return res.data;
}

export async function acceptInvitation(id) {
  const res = await api.post(`/api/invitation/${id}/accept`);
  return res.data;
}

export async function declineInvitation(id) {
  const res = await api.post(`/api/invitation/${id}/decline`);
  return res.data;
}

// ----- writes -----

export async function uploadImage(file) {
  const form = new FormData();
  form.append("image", file);
  return api.post("/api/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function create(table, data) {
  return api.post(`/api/${table}`, { data });
}

export async function update(table, id, data) {
  return api.post(`/api/${table}/${id}`, { data });
}

export async function softDelete(table, id) {
  return api.delete(`/api/${table}/${id}/soft`);
}

export async function restore(table, id) {
  return api.post(`/api/${table}/${id}/restore`);
}

export async function sendNotification(data) {
  return api.post(`/api/notification`, data);
}

export default api;
