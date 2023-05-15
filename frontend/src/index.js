import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <GoogleOAuthProvider clientId='425767565502-1l7nebdlirsgf8co8ob7bftj7js69tj1.apps.googleusercontent.com'>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </GoogleOAuthProvider>
  </Router>
);
