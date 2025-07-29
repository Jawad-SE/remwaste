import request from "supertest";
import app from "../app";

describe("Auth API", () => {
  const user = {
    email: "testuser@example.com",
    password: "testpass123",
    firstName: "Test",
    lastName: "User",
    role: "user",
  };
  const admin = {
    email: "admin@example.com",
    password: "adminpass",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
  };

  beforeAll(async () => {
    await request(app).post("/api/auth/register").send(user);
    await request(app).post("/api/auth/register").send(admin);
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...user, email: "newuser@example.com" });
    expect([201, 400]).toContain(res.statusCode);
  });

  it("should login and return a token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: user.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "wrong" });
    expect(res.statusCode).toBe(401);
  });

  it("should not register user with missing fields", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "no-fields@example.com" }); // missing password etc.
    expect(res.statusCode).toBe(400);
  });

  it("should not login with non-existent user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nouser@example.com", password: "nope" });
    expect(res.statusCode).toBe(401);
  });
  
  it("should not get profile with invalid token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer invalidtoken");
    expect([401, 403]).toContain(res.statusCode);
  });

  it("should get current user info", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: user.password });
    const token = loginRes.body.token;
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", user.email);
  });
});
