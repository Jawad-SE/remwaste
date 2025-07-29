import request from "supertest";
import app from "../app";

describe("Users API", () => {
  let token: string;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com", password: "testpass123" });
    token = loginRes.body.token;
  });

  it("should get all users", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a user by id", async () => {
    const usersRes = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    const userId = usersRes.body[0].id;
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", userId);
  });

  it("should not get users without token", async () => {
    const res = await request(app).get("/api/users");
    expect([401, 403]).toContain(res.statusCode);
  });

  it("should not get users without token", async () => {
    const res = await request(app).get("/api/users");
    expect([401, 403]).toContain(res.statusCode);
  });



});
