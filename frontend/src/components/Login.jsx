import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import LoginImage from "../assets/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const googleSuccess = async (response) => {
    const { email, name } = jwt_decode(response.credential);
    await axios
      .post("/api/v1/user/create", { name, email })
      .then((res) => {
        const data = res.data.user;
        window.localStorage.setItem("user", JSON.stringify(data));
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <img src={LoginImage} className='h-full w-full object-cover' />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-black/[0.4]'>
          <GoogleLogin
            className='absolute'
            onSuccess={googleSuccess}
            onFailure={(error) => console.log(error)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
