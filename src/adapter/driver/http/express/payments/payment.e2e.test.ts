import request from "supertest"
import { describe, it, expect } from "vitest"
import app from "../app"

const api = request(app)

describe("Payment E2E", () => {
  it("should simulate payment for the order", async () => {
    const clientRes = await api.post("/api/v1/clients").send({
      name: "TestUser",
      email: "testuser@example.com",
      cpf: "12345678901"
    })
    const clientId = clientRes.body.id
    const categoryRes = await api.post("/api/v1/categories").send({
      name: "Lanche",
      description: "Lanches deliciosos"
    })
    const categoryId = categoryRes.body.id
    const productRes = await api.post("/api/v1/products").send({
      name: "Hamburguer Teste",
      description: "Um hamburguer de teste",
      price: 15.5,
      categoryId, 
      active: true
    })
    const productId = productRes.body.id
    const orderRes = await api.post("/api/v1/orders").send({
      clientId,
      items: [
        { productId, quantity: 2 }
      ]
    })
    const orderId = orderRes.body.id
    const res = await api.post("/api/v1/payments").send({ orderId, paymentStatus: "PAID" })
    expect([200, 201]).toContain(res.status)
  })
})
