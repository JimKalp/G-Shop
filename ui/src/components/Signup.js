import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../services/authenticationService";
import contextWrapper from "../context/contextWrapper";

const Signup = (props) => {
  const [error, setError] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  return (
    <div>
      <h4 className="title">Create your account</h4>
      <br/>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const res = await AuthenticationService.register(
            username,
            email,
            password
          );
          if (res.error) {
            setError(res.error);
          } else {
            AuthenticationService.signin(
              username,
              password,
              props.context.login
            );
            history.push("/");
          }
        }}
      >
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            class="form-control"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            class="form-control"
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
            class="form-control"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <br/>
        <div>
          <input type="submit" value="Sign up" />
        </div>

        {error && <p className="alert alert-danger">{error}</p>}
      </form>
    </div>
  );
};

export default contextWrapper(Signup);
