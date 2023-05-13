import React from "react";
import { Navigate } from "react-router-dom";
import { fetchUser } from "../util/getUser";

const Protected = ({ children }) => {
  const user = fetchUser();

  if (user) {
    return <Navigate to='/home' />;
  }
  return children;
};

export default Protected;
