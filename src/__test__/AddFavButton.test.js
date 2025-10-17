import { render, screen } from "@testing-library/react";
import AddFavButton from "../components/common/AddFavButton";
import "@testing-library/jest-dom";

it("Should render Add Fav Button", () => {
  render(<AddFavButton />);
  const button = screen.getByTestId("Add Fav Button");
  expect(button).toBeInTheDocument();
});
