import request from "supertest"
import { describe, it, expect } from "vitest"
import app from "../app"

const api = request(app)

describe("Client E2E", () => {
  it("should register a client", async () => {
    const res = await api.post("/api/v1/clients").send({
      name: "TestUser",
      email: "testuser@example.com",
      cpf: "12345678901"
    })
    console.log(res.body); 
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("id")
  })
})
