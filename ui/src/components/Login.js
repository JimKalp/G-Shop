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
          <div className="hero is-primary ">
            <div className="hero-body container">
              <h4 className="title">Login</h4>
            </div>
          </div>
          <br />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              AuthenticationService.signin(username, password, state.login);
              history.push("/");
            }}
          >
            <div className="columns is-mobile is-centered">
              <div className="column is-one-third">
                <div className="field">
                  <label className="label">Username:</label>
                    <input
                      type="text"
                      name="username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                </div>
                <div className="field">
                  <label className="label">Password:</label>
                    <input
                      type="password"
                      name="password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                </div>
                <div className="field is-clearfix">
                  <input type="submit" value="Log In" />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Login;
