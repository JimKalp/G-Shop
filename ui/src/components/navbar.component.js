import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../services/authenticationService";
import { UserContext } from "../context/user_context";

axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    const token = "Bearer " + user.token;
    config.headers.Authorization = token;
  }
  return config;
});

function LogoutButton(props) {
  return (
    <button
      className="btn btn-danger btn-sm navbar-btn"
      onClick={props.onClick}
    >
      Log Out
    </button>
  );
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.signout.bind(this);
    this.state = {
      username: "",
      isAuthenticated: false,
      search: "",
    };
  }

  componentDidMoun() {
    axios
      .get("/secret")
      .then((data) => {
        this.setState({ username: data.data.username, isAuthenticated: true });
      })
      .catch((err) => {});
  }

  signout = () => {
    AuthenticationService.signOut();
    let logout = this.context.logout;
    logout();
    this.setState({ username: "", isAuthenticated: false });
  };

  render() {
    let name = this.context.username;
    let auth = this.context.isAuthenticated;
    let role = this.context.role;
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          G-Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/MyCart" className="nav-link">
                  My Cart
                </Link>
              </li>
              {role === "admin" && (
                <li className="navbar-item">
                  <Link to="/addProducts" className="nav-link">
                    Add Products
                  </Link>
                </li>
              )}
              {role === "user" && (
                <li className="navbar-item">
                  <Link to="/user" className="nav-link">
                    User Page
                  </Link>
                </li>
              )}
            </ul>
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(event) =>
                  this.setState({ search: event.target.value })
                }
              />
              <Link
                to={{ pathname: "/", state: { filter: this.state.search } }}
                className="btn btn-outline-success my-2 my-sm-0"
              >
                Search
              </Link>
            </form>
          </div>
        </div>
        <ul className="navbar-nav">
          {!auth && (
            <>
              <div className="btn-nav">
                <li className="nav-item">
                  <Link to="/login" className="btn btn-light btn-sm navbar-btn">
                    Log In
                  </Link>
                </li>
              </div>
              <li className="nav-item">
                <div className="btn-nav">
                  <Link
                    to="/signup"
                    className="btn btn-success btn-sm navbar-btn"
                  >
                    Sign up
                  </Link>
                </div>
              </li>
            </>
          )}
          {auth && (
            <li className="navbar-item navbar-right">
              <Link to="/login" className="nav-link">
                Logged in as: {name}
              </Link>
            </li>
          )}
          {auth && (
            <li className="navbar-item">
              <LogoutButton onClick={this.signout} />
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

Navbar.contextType = UserContext;

export default Navbar;
