import App from "../App";
import { render, screen } from "@testing-library/react";

describe("App.js", () => {
  it("renders title", () => {
    render(<App />);
    const linkElement = screen.getByText(/Kanban Todo/i);
    expect(linkElement).toBeInTheDocument();
  });
});
