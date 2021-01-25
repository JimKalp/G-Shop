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

  register = async (firstname, lastname, username, email, password) => {
    return axios.post("/api/auth/signup", {
      firstname,
      lastname,
      username,
      email,
      password,
    });
  };

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthenticationService();
