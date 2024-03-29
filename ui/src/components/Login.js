import React, { useState } from "react";
import AuthenticationService from "../services/authenticationService";
import contextWrapper from "../context/contextWrapper";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = (props) => {
  let history = useHistory();
  const [error, setError] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="form-container">
      <h4 className="title">Login</h4>
      <br/>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const res = await AuthenticationService.signin(
            username,
            password,
            props.context.login
          );
          if (res.error) {
            setError(res.error);
          } else {
            history.length > 2 ? history.goBack() : history.push("/");
          }
        }}
      >
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <input className="btn btn-success" type="submit" value="Log In" />
        </div>
        {error && (
          <p className="alert alert-danger" role="alert">
            Wrong username or password
          </p>
        )}
      </form>{" "}
    </div>
  );
};

export default contextWrapper(Login);
