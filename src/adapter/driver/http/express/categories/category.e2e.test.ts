import request from "supertest"
import { describe, it, expect } from "vitest"
import app from "../app"

const api = request(app)

describe("Category E2E", () => {
  it("should create a product category if not exists", async () => {
    const res = await api.post("/api/v1/categories").send({
      name: "Lanche",
      description: "Lanches deliciosos"
    })
    expect([201, 409]).toContain(res.status)
  })
})
