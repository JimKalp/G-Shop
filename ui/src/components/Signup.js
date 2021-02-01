import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../services/authenticationService";
import { UserContext } from "../context/user_context";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  return (
    <UserContext.Consumer>
      {(state) => (
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              let res = AuthenticationService.register(
                username,
                email,
                password
              )
                .then((resp) => {
                  console.log(resp);
                  let data = AuthenticationService.signin(
                    username,
                    password,
                    state.login
                  );
                  history.push("/");
                })
                .catch((err) => console.error(err));
            }}
          >
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div>
              <input type="submit" value="Sign up" />
            </div>
          </form>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Signup;
