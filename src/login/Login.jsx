import React from "react";
import LoginPageImageTransition from "./LoginPageImageTransition";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="absolute z-15 px-20 py-10 flex justify-between w-2/3">
        <div>
          <p className="text-4xl text-white font-bold text-wrap w-160 text-center">
            Login Subscribe and enjoy unlimited movies, shows & live sports
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl w-70 shadow-lg border border-white/20 ml-30">
          <LoginForm />
        </div>
      </div>
      <LoginPageImageTransition />
    </div>
  );
};

export default Login;
