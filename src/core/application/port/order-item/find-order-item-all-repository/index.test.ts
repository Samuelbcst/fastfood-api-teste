import { describe, it, expect } from "vitest"
import type { FindOrderItemAllRepository } from "."
import type { OrderItem } from "../../../../domain/order-item/order-item"

describe("FindOrderItemAllRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an array of OrderItem", async () => {
        // Mock implementation
        class MockFindOrderItemAllRepository implements FindOrderItemAllRepository {
            async execute(): Promise<OrderItem[]> {
                return [
                    {
                        id: 1,
                        orderId: 2,
                        productId: 3,
                        productName: "Burger",
                        unitPrice: 15.5,
                        quantity: 2,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 2,
                        orderId: 2,
                        productId: 4,
                        productName: "Fries",
                        unitPrice: 7.5,
                        quantity: 1,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ]
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindOrderItemAllRepository()
        const items = await repo.execute()
        expect(Array.isArray(items)).toBe(true)
        expect(items.length).toBe(2)
        expect(items[0].productName).toBe("Burger")
        expect(items[1].productName).toBe("Fries")
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
