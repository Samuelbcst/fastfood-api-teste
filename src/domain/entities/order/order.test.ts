import { describe, it, expect } from "vitest"
import { Order, OrderStatus } from "./order"

describe("Order", () => {
    it("should have id, items, status, createdAt, updatedAt, statusUpdatedAt, totalAmount, and optional clientId and pickupCode", () => {
        const now = new Date()
        const order: Order = {
            id: 1,
            items: [],
            status: OrderStatus.RECEIVED,
            createdAt: now,
            updatedAt: now,
            statusUpdatedAt: now,
            totalAmount: 100.5,
        }
        expect(order.id).toBe(1)
        expect(order.items).toEqual([])
        expect(order.status).toBe(OrderStatus.RECEIVED)
        expect(order.createdAt).toBe(now)
        expect(order.updatedAt).toBe(now)
        expect(order.statusUpdatedAt).toBe(now)
        expect(order.totalAmount).toBe(100.5)
        expect(order.clientId).toBeUndefined()
        expect(order.pickupCode).toBeUndefined()
    })

    it("should allow optional clientId and pickupCode", () => {
        const now = new Date()
        const order: Order = {
            id: 2,
            items: [],
            status: OrderStatus.READY,
            createdAt: now,
            updatedAt: now,
            statusUpdatedAt: now,
            totalAmount: 50,
            clientId: 10,
            pickupCode: "ABC123"
        }
        expect(order.clientId).toBe(10)
        expect(order.pickupCode).toBe("ABC123")
    })
})
