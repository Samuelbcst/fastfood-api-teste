import { describe, it, expect } from "vitest"
import type { DeleteOrderItemRepository } from "."
import type { OrderItem } from "../../../../domain/order-item/order-item"

describe("DeleteOrderItemRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an OrderItem or null", async () => {
        // Mock implementation
        class MockDeleteOrderItemRepository implements DeleteOrderItemRepository {
            async execute(param: { id: number }): Promise<OrderItem | null> {
                if (param.id === 1) {
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
        const repo = new MockDeleteOrderItemRepository()
        const found = await repo.execute({ id: 1 })
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.productName).toBe("Burger")
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
