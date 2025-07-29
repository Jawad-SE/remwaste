import request from "supertest";
import app from "../app";

describe("Patients API", () => {
  let adminToken: string;
  let userToken: string;
  let patientId: number;

  beforeAll(async () => {
    adminToken = (
      await request(app)
        .post("/api/auth/login")
        .send({ email: "admin@example.com", password: "adminpass" })
    ).body.token;
    userToken = (
      await request(app)
        .post("/api/auth/login")
        .send({ email: "testuser@example.com", password: "testpass123" })
    ).body.token;
  });

  it("should NOT allow non-admin to create patient", async () => {
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        firstName: "X",
        lastName: "Y",
        email: "xy@email.com",
        phoneNumber: "1",
        dob: new Date().toISOString(),
      });
    expect(res.statusCode).toBe(403);
  });

  it("should create a new patient as admin", async () => {
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
        phoneNumber: "1234567890",
        dob: new Date().toISOString(),
      });
    expect(res.statusCode).toBe(201);
    patientId = res.body.id;
  });

  it("should get all patients as admin", async () => {
    const res = await request(app)
      .get("/api/patients")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get all patients as non-admin", async () => {
    const res = await request(app)
      .get("/api/patients")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
  });

  it("should get a patient by id as admin", async () => {
    const res = await request(app)
      .get(`/api/patients/${patientId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", patientId);
  });

  it("should update a patient as admin", async () => {
    const res = await request(app)
      .put(`/api/patients/${patientId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        firstName: "Alice2",
        lastName: "Smith2",
        email: "alice2@example.com",
        phoneNumber: "999888777",
        dob: new Date().toISOString(),
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Alice2");
  });

  it("should NOT update patient as non-admin", async () => {
    const res = await request(app)
      .put(`/api/patients/${patientId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        firstName: "fail",
        lastName: "fail",
        email: "fail@example.com",
        phoneNumber: "999888777",
        dob: new Date().toISOString(),
      });
    expect(res.statusCode).toBe(403);
  });

  it("should bulk create patients as admin", async () => {
    const res = await request(app)
      .post("/api/patients/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        patients: [
          {
            firstName: "Bulk1",
            lastName: "Bulk",
            email: "bulk1@b.com",
            phoneNumber: "1",
            dob: new Date().toISOString(),
          },
          {
            firstName: "Bulk2",
            lastName: "Bulk",
            email: "bulk2@b.com",
            phoneNumber: "2",
            dob: new Date().toISOString(),
          },
        ],
      });
    expect(res.statusCode).toBe(201);
  });

  it("should delete a patient as admin", async () => {
    const res = await request(app)
      .delete(`/api/patients/${patientId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  it("should NOT delete a patient as non-admin", async () => {
    const res = await request(app)
      .delete(`/api/patients/${patientId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(403);
  });

  it("should return 400 if bulk create is called with empty array", async () => {
    const res = await request(app)
      .post("/api/patients/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ patients: [] });
    expect(res.statusCode).toBe(400);
  });

  it("should return 400 when creating patient with missing fields", async () => {
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ firstName: "OnlyName" });
    expect(res.statusCode).toBe(400);
  });

  it("should return 404 when getting non-existent patient", async () => {
    const res = await request(app)
      .get("/api/patients/99999999")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(404);
  });

  it("should return 404 when updating non-existent patient", async () => {
    const res = await request(app)
      .put("/api/patients/99999999")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        firstName: "Ghost",
        lastName: "Ghost",
        email: "ghost@email.com",
        phoneNumber: "0",
        dob: new Date().toISOString(),
      });
    expect(res.statusCode).toBe(404);
  });
  it("should return 404 when deleting non-existent patient", async () => {
    const res = await request(app)
      .delete("/api/patients/99999999")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(404);
  });

  it("should return 401 when creating patient with no token", async () => {
    const res = await request(app).post("/api/patients").send({
      firstName: "No",
      lastName: "Token",
      email: "no@token.com",
      phoneNumber: "0",
      dob: new Date().toISOString(),
    });
    expect([401, 403]).toContain(res.statusCode);
  });

  it("should patch patient as admin", async () => {
    // Create a patient first
    const patientRes = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        firstName: "Patchy",
        lastName: "McPatch",
        email: "patch@patch.com",
        phoneNumber: "555",
        dob: new Date().toISOString(),
      });
    const patchId = patientRes.body.id;

    // Patch only firstName
    const res = await request(app)
      .patch(`/api/patients/${patchId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ firstName: "Patched" });
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Patched");
  });
});
