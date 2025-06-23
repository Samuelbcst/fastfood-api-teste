import { describe, it, expect } from "vitest"
import type { FindOrderItemByIdRepository } from "."
import type { OrderItem } from "../../../../domain/order-item/order-item"

describe("FindOrderItemByIdRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an OrderItem or null", async () => {
        // Mock implementation
        class MockFindOrderItemByIdRepository implements FindOrderItemByIdRepository {
            async execute(id: number): Promise<OrderItem | null> {
                if (id === 1) {
                    return {
                        id: 1,
                        orderId: 2,
                        productId: 3,
                        productName: "Burger",
                        unitPrice: 15.5,
                        quantity: 2,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindOrderItemByIdRepository()
        const found = await repo.execute(1)
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.productName).toBe("Burger")
        const notFound = await repo.execute(2)
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
