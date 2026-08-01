import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err?.response?.data || err);
  },
);

export async function fetchById(table, id) {
  return api.get(`/api/${table}/${id}`);
}

export async function fetchByStatus(table, status) {
  return api.get(`/api/${table}/${status}`);
}

export async function fetchUserByRole(role) {
  return api.get(`/api/user/${role}`);
}

export async function fetchNotifications(status) {
  return api.get(status ? `/api/notification/${status}` : `/api/notification`);
}

export async function fetchUserNotifications(userId) {
  return api.get(`/api/notification/user/${userId}`);
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
