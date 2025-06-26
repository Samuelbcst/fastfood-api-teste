import { describe, it, expect } from "vitest"
import type { UpdateOrderItemRepository } from "."
import type { OrderItem } from "../../../../domain/entities/order-item/order-item"

describe("UpdateOrderItemRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, updating and returning an OrderItem or null", async () => {
        // Mock implementation
        class MockUpdateOrderItemRepository implements UpdateOrderItemRepository {
            async execute(param: { id: number; orderId?: string | number; productId?: string | number; productName?: string; unitPrice?: number; quantity?: number }): Promise<OrderItem | null> {
                if (param.id === 1) {
                    return {
                        id: 1,
                        orderId: Number(param.orderId ?? 2),
                        productId: Number(param.productId ?? 3),
                        productName: param.productName ?? "Burger",
                        unitPrice: param.unitPrice ?? 15.5,
                        quantity: param.quantity ?? 2,
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
        const repo = new MockUpdateOrderItemRepository()
        const updated = await repo.execute({ id: 1, productName: "Fries", unitPrice: 7.5, quantity: 1 })
        expect(updated).toBeDefined()
        expect(updated?.id).toBe(1)
        expect(updated?.productName).toBe("Fries")
        expect(updated?.unitPrice).toBe(7.5)
        expect(updated?.quantity).toBe(1)
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
