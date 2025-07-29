import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "../AuthForm";
import { login, register } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

jest.mock("@/hooks/useAuth", () => ({
  login: jest.fn(),
  register: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: pushMock });

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AuthForm (Login)", () => {
  it("renders email and password fields", () => {
    render(<AuthForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits with valid credentials, shows success toast, and redirects", async () => {
    (login as jest.Mock).mockResolvedValue({});
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "pass12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "user@mail.com",
        password: "pass12345",
      });
      expect(toast.success).toHaveBeenCalledWith("Logged in!");
      expect(pushMock).toHaveBeenCalledWith("/patients");
    });
  });

  it("shows error for empty fields", async () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findAllByText(/required|min 8 chars/i)).toBeTruthy();
  });

  it("shows error toast on login failure", async () => {
    (login as jest.Mock).mockRejectedValue(new Error("Login failed"));
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "fail@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error!");
    });
  });
});

describe("AuthForm (Register)", () => {
  it("renders all fields in register mode", () => {
    render(<AuthForm isRegister={true} />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/select role/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("submits valid register form, shows success toast, and redirects to login", async () => {
    (register as jest.Mock).mockResolvedValue({});
    render(<AuthForm isRegister={true} />);
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Eve" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Adams" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "eve@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password1" },
    });

    fireEvent.click(screen.getByText(/select role/i));
    fireEvent.click(screen.getByText(/User/i));

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        email: "eve@mail.com",
        password: "password1",
        firstName: "Eve",
        lastName: "Adams",
        role: "user",
      });
      expect(toast.success).toHaveBeenCalledWith("Registered successfully!");
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  it("shows errors for empty fields in register mode", async () => {
    render(<AuthForm isRegister={true} />);
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(await screen.findAllByText(/required|min 8 chars/i)).toBeTruthy();
  });

  it("shows error toast on register failure", async () => {
    (register as jest.Mock).mockRejectedValue(new Error("Register failed"));
    render(<AuthForm isRegister={true} />);
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Eve" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Adams" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "eve@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password1" },
    });

    fireEvent.click(screen.getByText(/select role/i));
    fireEvent.click(screen.getByText(/User/i));

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error!");
    });
  });

  it("shows field error if role is not selected in register", async () => {
    render(<AuthForm isRegister={true} />);
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Eve" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Adams" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "eve@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByText(/role required/i)).toBeInTheDocument();
    expect(toast.error).not.toHaveBeenCalled();
  });
});
