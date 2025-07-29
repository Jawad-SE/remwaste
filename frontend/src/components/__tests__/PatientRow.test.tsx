jest.mock('@headlessui/react', () => {
  const actual = jest.requireActual('@headlessui/react');
  return {
    ...actual,
    Transition: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientRow from "../../components/patients/PatientRow";
import { useRole } from "@/hooks/useRole";

const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

jest.mock("@/hooks/useRole", () => ({
  useRole: jest.fn(),
}));

const findMenuButtonByText = async (regex: RegExp) => {
  return await screen.findByText((content, element) =>
    element?.tagName.toLowerCase() === "button" &&
    regex.test(element.textContent || "")
  );
};

describe("PatientRow", () => {
  const patient = {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    phoneNumber: "1234567890",
    dob: "1992-03-15",
  };
  const onClick = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRole as jest.Mock).mockReturnValue("admin");
  });

  it("renders patient data", () => {
    render(
      <table>
        <tbody>
          <PatientRow
            patient={patient}
            onClick={onClick}
            onDelete={onDelete}
            rowIndex={0}
          />
        </tbody>
      </table>
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(
      screen.getByText(new Date(patient.dob).toLocaleDateString())
    ).toBeInTheDocument();
  });

  it("calls onClick when row is clicked", async () => {
    render(
      <table>
        <tbody>
          <PatientRow
            patient={patient}
            onClick={onClick}
            onDelete={onDelete}
            rowIndex={0}
          />
        </tbody>
      </table>
    );
    await userEvent.click(screen.getByText("Alice"));
    expect(onClick).toHaveBeenCalled();
  });

  it("shows menu button and opens menu on click", async () => {
    render(
      <table>
        <tbody>
          <PatientRow
            patient={patient}
            onClick={onClick}
            onDelete={onDelete}
            rowIndex={0}
          />
        </tbody>
      </table>
    );
    await userEvent.click(screen.getByRole("button"));

    const editBtn = await findMenuButtonByText(/edit/i);
    const deleteBtn = await findMenuButtonByText(/delete/i);
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });

  it("navigates to edit page on Edit", async () => {
    render(
      <table>
        <tbody>
          <PatientRow
            patient={patient}
            onClick={onClick}
            onDelete={onDelete}
            rowIndex={0}
          />
        </tbody>
      </table>
    );
    await userEvent.click(screen.getByRole("button"));
    const editBtn = await findMenuButtonByText(/edit/i);
    await userEvent.click(editBtn);
    expect(push).toHaveBeenCalledWith(`/patients/${patient.id}/edit`);
  });

  it("calls onDelete with id on Delete", async () => {
    render(
      <table>
        <tbody>
          <PatientRow
            patient={patient}
            onClick={onClick}
            onDelete={onDelete}
            rowIndex={0}
          />
        </tbody>
      </table>
    );
    await userEvent.click(screen.getByRole("button"));
    const deleteBtn = await findMenuButtonByText(/delete/i);
    await userEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith(patient.id);
  });

  it("does not show menu if role is not admin", () => {
    (useRole as jest.Mock).mockReturnValue("user");
    render(
      <table>
        <tbody>
          <PatientRow
            patient={patient}
            onClick={onClick}
            onDelete={onDelete}
            rowIndex={0}
          />
        </tbody>
      </table>
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("menuitem", { name: /edit/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("menuitem", { name: /delete/i })
    ).not.toBeInTheDocument();
  });
});
