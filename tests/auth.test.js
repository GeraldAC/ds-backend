import request from "supertest";
import app from "../src/app.js";
import { clearDatabase, closeDatabase } from "./setup.js";
import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";

describe("Auth Endpoints", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  const buildTestEmail = () => `user${Date.now()}@example.com`;

  describe("POST /api/auth/register", () => {
    it("debería registrar un usuario exitosamente", async () => {
      const email = buildTestEmail();

      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email,
        password: "12345678",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(
        "message",
        "User registered successfully",
      );
      expect(res.body.user).toHaveProperty("email", email);
    });

    it("debería fallar si el email ya está registrado", async () => {
      const email = buildTestEmail();

      // Registrar primero
      await request(app).post("/api/auth/register").send({
        name: "Test User",
        email,
        password: "12345678",
      });

      // Segundo intento con el mismo correo
      const res = await request(app).post("/api/auth/register").send({
        name: "Another User",
        email,
        password: "12345678",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Email already registered");
    });
  });

  describe("POST /api/auth/login", () => {
    it("debería iniciar sesión correctamente con credenciales válidas", async () => {
      const email = buildTestEmail();

      await request(app).post("/api/auth/register").send({
        name: "Login User",
        email,
        password: "12345678",
      });

      const res = await request(app).post("/api/auth/login").send({
        email,
        password: "12345678",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", email);
    });

    it("debería fallar con credenciales incorrectas", async () => {
      const email = buildTestEmail();

      await request(app).post("/api/auth/register").send({
        name: "Login User",
        email,
        password: "12345678",
      });

      const res = await request(app).post("/api/auth/login").send({
        email,
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
  });
});
