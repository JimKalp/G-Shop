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
        setUserState(username, response.data.role);
      }
      return response;
    } catch (err) {
      return { error: "Unauthorized" };
    }
  };

  signOut() {
    localStorage.removeItem("user");
  }

  register = async (username, email, password) => {
    try {
      const res = await axios.post("/users/add", {
        username,
        email,
        password,
      });
      return res;
    } catch (err) {
      return { error: "Username or email exists" };
    }
  };

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthenticationService();
