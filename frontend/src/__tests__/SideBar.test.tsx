import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../components/SideBar";
import '@testing-library/jest-dom';

describe("Sidebar", () => {
  it("renders logo and nav item", () => {
    render(<Sidebar />);
    expect(screen.getByText("REMWASTE")).toBeInTheDocument();
    expect(screen.getByText("Patients")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /patients/i })).toHaveAttribute("href", "/patients");
  });

  it("collapses and expands when button is clicked", async () => {
    render(<Sidebar />);
    const toggleBtn = screen.getByRole("button");
    // Collapse
    await userEvent.click(toggleBtn);
    expect(screen.queryByText("REMWASTE")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "" })).toBeInTheDocument(); // Only icon, no text
    // Expand
    await userEvent.click(toggleBtn);
    expect(screen.getByText("REMWASTE")).toBeInTheDocument();
  });
});
