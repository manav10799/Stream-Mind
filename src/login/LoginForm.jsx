import React from "react";

const LoginForm = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-white mb-4">Sign In</h1>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Email"
          className="border p-2 rounded bg-blue-50 focus-within:outline-0 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded bg-blue-50 focus-within:outline-0"
        />
        <button className="bg-red-800/50 rounded-xl py-3 px-2 mt-2 cursor-pointer text-white">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
