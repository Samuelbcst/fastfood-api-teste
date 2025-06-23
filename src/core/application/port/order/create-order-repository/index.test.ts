import { describe, it, expect } from "vitest"
import type { CreateOrderRepository } from "."
import type { Order } from "../../../../domain/order/order"
import { OrderStatus } from "../../../../domain/order/order"

describe("CreateOrderRepository", () => {
    it("should define a create method that returns an Order and a finish method", async () => {
        // Mock implementation
        class MockCreateOrderRepository implements CreateOrderRepository {
            async create(input: any): Promise<Order> {
                return {
                    id: 1,
                    items: input.items ?? [],
                    status: input.status ?? OrderStatus.RECEIVED,
                    statusUpdatedAt: input.statusUpdatedAt ?? new Date(),
                    totalAmount: input.totalAmount ?? 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    clientId: input.clientId,
                    pickupCode: input.pickupCode,
                }
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockCreateOrderRepository()
        const input = {
            clientId: 2,
            items: [],
            status: OrderStatus.RECEIVED,
            statusUpdatedAt: new Date(),
            totalAmount: 100,
            pickupCode: "ABC123"
        }
        const order = await repo.create(input)
        expect(order.id).toBe(1)
        expect(order.clientId).toBe(2)
        expect(order.status).toBe(OrderStatus.RECEIVED)
        expect(order.totalAmount).toBe(100)
        expect(order.pickupCode).toBe("ABC123")
        expect(order.createdAt).toBeInstanceOf(Date)
        expect(order.updatedAt).toBeInstanceOf(Date)
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
