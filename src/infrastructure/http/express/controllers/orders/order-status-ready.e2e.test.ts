import request from "supertest"
import { describe, it, expect } from "vitest"
import app from "../../app"

const api = request(app)

describe("Order Status READY E2E", () => {
  it("should update order status to 'Ready'", async () => {
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
      categoryId, // <-- use the correct key
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
    await api.post("/api/v1/payments").send({ orderId, paymentStatus: "PAID" })
    await api.put(`/api/v1/orders/${orderId}/status`).send({ status: "PREPARING" })
    const res = await api.put(`/api/v1/orders/${orderId}/status`).send({ status: "READY" })
    expect(res.status).toBe(200)
    expect(res.body.status).toBe("READY")
  })
})
