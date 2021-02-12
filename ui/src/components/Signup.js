import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../services/authenticationService";
import { UserContext } from "../context/user_context";

const Signup = () => {
  const [error, setError] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  return (
    <UserContext.Consumer>
      {(state) => (
        <div>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const res = await AuthenticationService.register(
                username,
                email,
                password
              );
              console.log(res);
              if (res.error) {
                setError(res.error);
              } else {
                AuthenticationService.signin(username, password, state.login);
                history.push("/");
              }
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
            {error && (
              <p className="alert alert-danger">Username or email exists</p>
            )}
          </form>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Signup;
