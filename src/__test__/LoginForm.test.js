import { render, screen } from "@testing-library/react";
import LoginForm from "../login/LoginForm";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import AppStore from "../ReduxStore/AppStore";

it("Should contain sign in button inside login form", () => {
  render(
    <Provider store={AppStore}>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByRole("button", { name: "Sign In" });
  expect(button).toBeInTheDocument();
});

it("Should have Email and Password Input fields", () => {
  render(
    <Provider store={AppStore}>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </Provider>
  );
  const emailInputFields = screen.getByPlaceholderText("Type your email");
  const PasswordIputFields = screen.getByPlaceholderText("Type your email");
  expect(emailInputFields).toBeInTheDocument();
  expect(PasswordIputFields).toBeInTheDocument();
});
