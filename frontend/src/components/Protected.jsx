import React from "react";
import { useAlert } from "react-alert";
import { Navigate } from "react-router-dom";
import { fetchUser } from "../util/getUser";

const Protected = ({ children }) => {
  const user = fetchUser();
  const alert = useAlert();

  if (!user) {
    alert.error("login to proceed 🙂");
    return <Navigate to='/' replace />;
  }
  return children;
};

export default Protected;
