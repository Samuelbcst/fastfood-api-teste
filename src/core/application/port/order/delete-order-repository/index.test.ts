import { describe, it, expect } from "vitest"
import type { DeleteOrderRepository } from "."
import { OrderStatus } from "../../../../domain/order/order"
import type { Order } from "../../../../domain/order/order"

describe("DeleteOrderRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an Order or null", async () => {
        // Mock implementation
        class MockDeleteOrderRepository implements DeleteOrderRepository {
            async execute(param: { id: number }): Promise<Order | null> {
                if (param.id === 1) {
                    return {
                        id: 1,
                        items: [],
                        status: OrderStatus.RECEIVED,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        statusUpdatedAt: new Date(),
                        totalAmount: 0,
                    }
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockDeleteOrderRepository()
        const found = await repo.execute({ id: 1 })
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.status).toBe(OrderStatus.RECEIVED)
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
