import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationBar from "@/components/patients/PaginationBar";

describe("PaginationBar", () => {
  const setup = (
    props?: Partial<React.ComponentProps<typeof PaginationBar>>
  ) => {
    const defaultProps = {
      currentPage: 2,
      totalPages: 5,
      setCurrentPage: jest.fn(),
      pageSize: 10,
      setPageSize: jest.fn(),
      ...props,
    };
    render(<PaginationBar {...defaultProps} />);
    return defaultProps;
  };

  it("renders rows per page select", () => {
    setup();
    expect(screen.getByText(/rows per page/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
  });

  it("calls setPageSize on changing page size", async () => {
    const setPageSize = jest.fn();
    setup({ setPageSize });
    await userEvent.selectOptions(screen.getByRole("combobox"), "20");
    expect(setPageSize).toHaveBeenCalledWith(20);
  });

  it("disables Next on last page", () => {
    setup({ currentPage: 5, totalPages: 5 });
    const nextBtn = screen.getByText(/next/i);
    expect(nextBtn).toBeDisabled();
  });

  it("disables Previous on first page", () => {
    setup({ currentPage: 1, totalPages: 5 });
    const prevBtn = screen.getByText(/previous/i);
    expect(prevBtn).toBeDisabled();
  });

  it("calls setCurrentPage when Previous and Next are clicked", async () => {
    const setCurrentPage = jest.fn();
    setup({ setCurrentPage, currentPage: 2, totalPages: 5 });

    await userEvent.click(screen.getByText(/previous/i));
    expect(setCurrentPage).toHaveBeenCalledWith(1);

    await userEvent.click(screen.getByText(/next/i));
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });

  it("renders all page buttons when totalPages <= 7", () => {
    setup({ currentPage: 2, totalPages: 5 });
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole("button", { name: `${i}` })).toBeInTheDocument();
    }
  });

  it("renders ellipsis when totalPages > 7 and at start", () => {
    setup({ currentPage: 2, totalPages: 10 });
    expect(screen.getAllByTestId("ellipsis")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
  });

  it("highlights current page button", () => {
    setup({ currentPage: 3, totalPages: 5 });
    const btn = screen.getByRole("button", { name: "3" });
    expect(btn).toHaveClass("bg-blue-600");
    expect(btn).toHaveClass("text-white");
  });

  it("calls setCurrentPage when a page button is clicked", async () => {
    const setCurrentPage = jest.fn();
    setup({ setCurrentPage, currentPage: 2, totalPages: 5 });

    await userEvent.click(screen.getByRole("button", { name: "4" }));
    expect(setCurrentPage).toHaveBeenCalledWith(4);
  });
});
