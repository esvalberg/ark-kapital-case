import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders ark kapital react case", () => {
  render(<App />);
  const element = screen.getByText(/Ark Kapital Case/i);
  expect(element).toBeInTheDocument();
});
