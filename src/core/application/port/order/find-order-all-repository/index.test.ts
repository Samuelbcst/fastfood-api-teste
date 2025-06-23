import { describe, it, expect } from "vitest"
import type { FindOrderAllRepository } from "."
import type { Order } from "../../../../domain/order/order"
import { OrderStatus } from "../../../../domain/order/order"

describe("FindOrderAllRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an array of Order", async () => {
        // Mock implementation
        class MockFindOrderAllRepository implements FindOrderAllRepository {
            async execute(): Promise<Order[]> {
                return [
                    {
                        id: 1,
                        items: [],
                        status: OrderStatus.RECEIVED,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        statusUpdatedAt: new Date(),
                        totalAmount: 10,
                    },
                    {
                        id: 2,
                        items: [],
                        status: OrderStatus.FINISHED,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        statusUpdatedAt: new Date(),
                        totalAmount: 20,
                    },
                ]
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindOrderAllRepository()
        const orders = await repo.execute()
        expect(Array.isArray(orders)).toBe(true)
        expect(orders.length).toBe(2)
        expect(orders[0].status).toBe(OrderStatus.RECEIVED)
        expect(orders[1].status).toBe(OrderStatus.FINISHED)
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
