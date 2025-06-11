import React, { useRef, useState } from "react";
import { checkValidEmail, checkValidPassword } from "../utils/validation";

const LoginForm = () => {
  const [isSignUpForm, setisSignUpForm] = useState(false);
  const [emailValidation, setEmailValidation] = useState("");
  const [passValidation, setpassValidation] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setisSignUpForm(!isSignUpForm);
  };
  const handleSignInUpButton = () => {
    const emailErr = checkValidEmail(email.current.value);
    const passwordErr = checkValidPassword(password.current.value);
    setEmailValidation(emailErr);
    setpassValidation(passwordErr);
  };
  return (
    <div className="py-8 px-12">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-200 mb-2">
          {isSignUpForm ? "Sign Up" : "Sign In"}
        </h1>
        <p className="text-sm text-gray-200 mb-2">
          Please {isSignUpForm ? "sign up" : "sign in"} to access your account
        </p>
      </div>
      <form className="flex flex-col" onClick={(e) => e.preventDefault()}>
        {isSignUpForm && (
          <>
            <label className="text-gray-200 mb-0.5 text-xs">Name</label>
            <input
              type="text"
              placeholder="Type your Name"
              className="px-4 py-3 rounded bg-gray-700 focus-within:outline-0 mb-6 placeholder:text-gray-200 text-xs text-gray-200"
            />
          </>
        )}

        <label className="text-gray-200 mb-0.5 text-xs">Email</label>
        <div className="mb-6 flex flex-col">
          <input
            type="text"
            ref={email}
            placeholder="Type your email"
            className="px-4 py-3 rounded bg-gray-700 focus-within:outline-0 mb-1 placeholder:text-gray-200 text-xs text-gray-200"
          />
          <label className="text-red-300 mb-0.5 text-xs font-bold">
            {emailValidation}
          </label>
        </div>
        <label className="text-gray-200 mb-0.5 text-xs">Password</label>
        <div className="flex flex-col mb-4">
          <input
            type="password"
            ref={password}
            placeholder="Type your password"
            className="px-4 py-3 rounded bg-gray-700 focus-within:outline-0 mb-1 text-xs placeholder:text-gray-200 text-gray-200"
          />
          <label className="text-red-300 mb-0.5 text-xs font-bold">
            {passValidation}
          </label>
        </div>
        <button
          className="bg-green-600 rounded py-2 px-2 mt-2 cursor-pointer text-sm"
          onClick={handleSignInUpButton}
        >
          {isSignUpForm ? "Sign Up" : "Sign In"}
        </button>
        <p
          className="text-sm text-gray-200 mt-2 cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignUpForm ? "Back to Login?" : "Create a new account"}
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
