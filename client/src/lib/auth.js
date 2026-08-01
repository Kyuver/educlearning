import api from "./api";

export async function authenticate({ name, password, role }) {

  const res = await api.post('/api/login', {
    name: name,
    password: password,
    role: role
  });

  const user = res.data.data;
  console.log(user)
}
