import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteConfirmationModal from "@/components/patients/DeleteConfirmationModal";
import '@testing-library/jest-dom';

describe("DeleteConfirmationModal", () => {
  it("renders when open", () => {
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />
    );
    expect(screen.getByText("Confirm Deletion")).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", async () => {
    const onClose = jest.fn();
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={onClose}
        onConfirm={jest.fn()}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onConfirm and onClose when Delete is clicked", async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onConfirm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
