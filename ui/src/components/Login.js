import React, { useState } from "react";
import AuthenticationService from "../services/authenticationService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          AuthenticationService.signin(username, password);
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
  );
};

export default Login;
