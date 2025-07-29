import { render, screen, fireEvent } from "@testing-library/react";
import PatientModal from "../../components/PatientModal";

describe("PatientModal", () => {
  const patient = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123456789",
    email: "john.doe@email.com",
    dob: "1990-01-01",
  };
  const onClose = jest.fn();

  beforeEach(() => onClose.mockClear());

  it("renders patient data", () => {
    render(<PatientModal patient={patient} onClose={jest.fn()} />);
    expect(screen.getByText(/John\s+Doe/i)).toBeInTheDocument();
    expect(screen.getByText("john.doe@email.com")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
  });
  
  it("calls onClose when close button clicked", () => {
    render(<PatientModal patient={patient} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(<PatientModal patient={patient} onClose={onClose} />);
    fireEvent.click(document.querySelector(".fixed")!);
    expect(onClose).toHaveBeenCalled();
  });
});
