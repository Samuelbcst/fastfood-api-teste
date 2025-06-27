import { describe, it, expect } from "vitest"
import type { FindOrderByClientRepository } from "."
import type { Order } from "../../../../domain/entities/order/order"
import { OrderStatus } from "../../../../domain/entities/order/order"

describe("FindOrderByClientRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an array of Order or null", async () => {
        // Mock implementation
        class MockFindOrderByClientRepository implements FindOrderByClientRepository {
            async execute(clientId: number): Promise<Order[] | null> {
                if (clientId === 1) {
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
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindOrderByClientRepository()
        const orders = await repo.execute(1)
        expect(Array.isArray(orders)).toBe(true)
        expect(orders?.length).toBe(2)
        expect(orders?.[0].status).toBe(OrderStatus.RECEIVED)
        expect(orders?.[1].status).toBe(OrderStatus.FINISHED)
        const notFound = await repo.execute(2)
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
