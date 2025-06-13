import { render, screen } from "@testing-library/react";
import LoginForm from "../login/LoginForm";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router";

it("Should contain sign in button inside login form", () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
  const button = screen.getByRole("button", { name: "Sign In" });
  expect(button).toBeInTheDocument();
});

it("Should have Email and Password Input fields", () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
  const emailInputFields = screen.getByPlaceholderText("Type your email");
  const PasswordIputFields = screen.getByPlaceholderText("Type your email");
  expect(emailInputFields).toBeInTheDocument();
  expect(PasswordIputFields).toBeInTheDocument();
});
