import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

class AuthenticationService {
  signin = async (username, password, setUserState) => {
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUserState(username);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  signOut() {
    localStorage.removeItem("user");
  }

  register = async (username, email, password) => {
    const res = await axios.post("/users/add", {
      username,
      email,
      password,
    });
    return res;
  };

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthenticationService();
