import { describe, it, expect } from "vitest"
import type { CreateOrderItemRepository } from "."
import type { OrderItem } from "../../../../domain/order-item/order-item"

describe("CreateOrderItemRepository", () => {
    it("should define a create method that returns an OrderItem and a finish method", async () => {
        // Mock implementation
        class MockCreateOrderItemRepository implements CreateOrderItemRepository {
            async create(input: Omit<OrderItem, keyof OrderItem>): Promise<OrderItem> {
                return {
                    id: 1,
                    ...input,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                } as OrderItem
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockCreateOrderItemRepository()
        const input = { orderId: 2, productId: 3, productName: "Burger", unitPrice: 15.5, quantity: 2 }
        const item = await repo.create(input as any)
        expect(item.id).toBe(1)
        expect(item.orderId).toBe(2)
        expect(item.productId).toBe(3)
        expect(item.productName).toBe("Burger")
        expect(item.unitPrice).toBe(15.5)
        expect(item.quantity).toBe(2)
        expect(item.createdAt).toBeInstanceOf(Date)
        expect(item.updatedAt).toBeInstanceOf(Date)
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
