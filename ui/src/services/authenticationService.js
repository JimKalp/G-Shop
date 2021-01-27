import axios from "axios";

class AuthenticationService {
  signin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
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
    const res = await axios.post("http://localhost:8080/users/add", {
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
