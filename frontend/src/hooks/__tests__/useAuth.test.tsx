import { register, login, logout } from "../useAuth";
import { api } from "@/lib/api";
import Cookies from "js-cookie";

jest.mock("@/lib/api", () => ({
  api: { post: jest.fn() },
}));
jest.mock("js-cookie", () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

const mockedApiPost = api.post as jest.Mock;

describe("auth service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("register calls api.post with correct data", async () => {
    mockedApiPost.mockResolvedValue({ data: { success: true } });
    const data = { firstName: "A", lastName: "B", email: "a@b.com", password: "password", role: "user" };
    const result = await register(data);

    expect(mockedApiPost).toHaveBeenCalledWith("/auth/register", data);
    expect(result).toEqual({ data: { success: true } });
  });

  it("login sets cookies and returns response", async () => {
    mockedApiPost.mockResolvedValue({
      data: { token: "tok123", user: { role: "admin" } },
    });
    const creds = { email: "a@b.com", password: "123" };
    const result = await login(creds);

    expect(mockedApiPost).toHaveBeenCalledWith("/auth/login", creds);
    expect(Cookies.set).toHaveBeenCalledWith("token", "tok123");
    expect(Cookies.set).toHaveBeenCalledWith("role", "admin");
    expect(result.data.token).toBe("tok123");
  });

  it("logout removes token cookie", () => {
    logout();
    expect(Cookies.remove).toHaveBeenCalledWith("token");
  });
});
