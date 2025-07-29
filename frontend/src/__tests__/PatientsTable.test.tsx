jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientsTable from "@/components/patients/PatientsTable";
import { useRole } from "@/hooks/useRole";
import '@testing-library/jest-dom';
jest.mock("@/hooks/useRole", () => ({
  useRole: jest.fn(),
}));

const mockPatients = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    phoneNumber: "1234567890",
    dob: "1992-03-15"
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Jones",
    email: "bob@example.com",
    phoneNumber: "5555555555",
    dob: "1991-01-10"
  }
];

describe("PatientsTable", () => {
  const onSelect = jest.fn();
  const onDelete = jest.fn();
  const onEdit = jest.fn();
  const setCurrentPage = jest.fn();
  const setPageSize = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRole as jest.Mock).mockReturnValue("admin");
  });


  it("renders 'No patients found.' when no patients", () => {
    render(
      <PatientsTable
        patients={[]}
        onSelect={onSelect}
        onDelete={onDelete}
        onEdit={onEdit}
        currentPage={1}
        totalPages={1}
        setCurrentPage={setCurrentPage}
        pageSize={10}
        setPageSize={setPageSize}
      />
    );
    expect(screen.getByText("No patients found.")).toBeInTheDocument();
  });

  it("calls onSelect when patient row is clicked", async () => {
    render(
      <PatientsTable
        patients={mockPatients}
        onSelect={onSelect}
        onDelete={onDelete}
        onEdit={onEdit}
        currentPage={1}
        totalPages={2}
        setCurrentPage={setCurrentPage}
        pageSize={10}
        setPageSize={setPageSize}
      />
    );
    await userEvent.click(screen.getByText("Alice"));
    expect(onSelect).toHaveBeenCalledWith(mockPatients[0]);
  });
});
