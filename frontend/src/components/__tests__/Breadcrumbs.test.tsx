import { render, screen } from "@testing-library/react";
import Breadcrumbs from "@/components/Breadcrumbs";
import '@testing-library/jest-dom';

describe("Breadcrumbs", () => {
  it("renders all breadcrumb items", () => {
    const items = [
      { label: "Dashboard", href: "/" },
      { label: "Patients", href: "/patients" },
      { label: "Alice" }
    ];
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Patients")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    // First two should be links, last should be span
    expect(screen.getByText("Dashboard").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Patients").closest("a")).toHaveAttribute("href", "/patients");
    expect(screen.getByText("Alice").closest("a")).toBeNull();
  });

  it("renders chevrons between items", () => {
    const items = [
      { label: "A", href: "/a" },
      { label: "B" },
      { label: "C", href: "/c" }
    ];
    render(<Breadcrumbs items={items} />);
    // There should be 2 chevrons for 3 items
    expect(screen.getAllByTestId("chevron-right").length).toBe(2);
  });
});
