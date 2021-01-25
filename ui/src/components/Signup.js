import React, { useState } from "react";
import AuthenticationService from "../services/authenticationService";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          AuthenticationService.register(username, email, password);
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
  );
};

export default Signup;
