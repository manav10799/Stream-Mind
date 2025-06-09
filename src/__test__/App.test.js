import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

it("Should test app.jsx basic testing", () => {
  render(<App />);
  const isTextPresent = screen.getByText("Hello");
  expect(isTextPresent).toBeInTheDocument();
});
