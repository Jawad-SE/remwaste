import MockAdapter from "axios-mock-adapter";
import Cookies from "js-cookie";
import { api } from "@/lib/api";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("api instance", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
    jest.clearAllMocks();
  });

  afterEach(() => {
    mock.restore();
  });

  it("should set Authorization header if token exists in cookies", async () => {
    (Cookies.get as jest.Mock).mockReturnValue("sometoken");

    mock.onGet("/test").reply((config) => {
      expect(config.headers!.Authorization).toBe("Bearer sometoken");
      return [200, { success: true }];
    });

    const response = await api.get("/test");
    expect(response.data).toEqual({ success: true });
  });

  it("should NOT set Authorization header if token does not exist", async () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);

    mock.onGet("/test").reply((config) => {
      expect(config.headers!.Authorization).toBeUndefined();
      return [200, { success: true }];
    });

    const response = await api.get("/test");
    expect(response.data).toEqual({ success: true });
  });
});
