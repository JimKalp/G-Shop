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
      // .catch((err) => console.log(err.response));
      return res;
    } catch (err) {
      console.log(err.response);
      let error = err.response.data;
      let msg = "";
      if (error.sanitizationError) {
        error.errors.map((err) => {
          return (msg += `${err.msg} for ${err.param}`);
        });
      } else msg = error;
      return { error: msg };
    }
  };

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthenticationService();
