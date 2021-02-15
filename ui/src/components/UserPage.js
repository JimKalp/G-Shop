import React, { useEffect, useState } from "react";
import contextWrapper from "../context/contextWrapper";
import axios from "axios";
import { Redirect } from "react-router-dom";

function UserPage(props) {
  const [data, setdata] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get("/secret").catch((err) => {});
      res && setdata(res.data);
    };
    getUserData();
  }, [setdata]);

  return props.context.isAuthenticated ? (
    <div>
      <h1>User Profile</h1>
      <h2>{data.username}</h2>
      <p>{data.email}</p>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default contextWrapper(UserPage);
