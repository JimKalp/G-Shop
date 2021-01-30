import React, { useState } from "react";
import AuthenticationService from "../services/authenticationService";
import { UserContext } from "../context/user_context";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <UserContext.Consumer>
      {(state) => (
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              AuthenticationService.signin(username, password);
              state.login(username);
              history.push("/");
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
              <input type="submit" value="Log In" />
            </div>
          </form>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Login;
