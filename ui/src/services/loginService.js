import axios from "axios";

axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    token = "Bearer " + token;
    config.headers.Authorization = token;
  }
  return config;
});

async function getUsers() {
  return await axios.get("http://localhost:8080/users");
}
