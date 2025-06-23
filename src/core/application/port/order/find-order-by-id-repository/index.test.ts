import { describe, it, expect } from "vitest"
import type { FindOrderByIdRepository } from "."
import type { Order } from "../../../../domain/order/order"
import { OrderStatus } from "../../../../domain/order/order"

describe("FindOrderByIdRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an Order or null", async () => {
        // Mock implementation
        class MockFindOrderByIdRepository implements FindOrderByIdRepository {
            async execute(id: number): Promise<Order | null> {
                if (id === 1) {
                    return {
                        id: 1,
                        items: [],
                        status: OrderStatus.RECEIVED,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        statusUpdatedAt: new Date(),
                        totalAmount: 10,
                    }
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindOrderByIdRepository()
        const found = await repo.execute(1)
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.status).toBe(OrderStatus.RECEIVED)
        const notFound = await repo.execute(2)
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
