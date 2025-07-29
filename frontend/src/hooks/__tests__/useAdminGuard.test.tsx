import { renderHook } from "@testing-library/react";
import { useAdminGuard } from "../useAdminGuard";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

const mockRedirect = jest.fn() as (url: string) => void;

jest.mock("next/navigation", () => ({
  redirect: (url: string) => mockRedirect(url),
}));

import Cookies from "js-cookie";

describe("useAdminGuard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does NOT redirect when role is 'admin'", () => {
    (Cookies.get as jest.Mock).mockReturnValue("admin");

    renderHook(() => useAdminGuard());

    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("redirects to /patients when role is not 'admin'", () => {
    (Cookies.get as jest.Mock).mockReturnValue("user");

    renderHook(() => useAdminGuard());

    expect(mockRedirect).toHaveBeenCalledWith("/patients");
  });

  it("redirects to /patients when role is missing", () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);

    renderHook(() => useAdminGuard());

    expect(mockRedirect).toHaveBeenCalledWith("/patients");
  });
});
