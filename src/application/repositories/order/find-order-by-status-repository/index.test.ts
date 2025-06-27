import { describe, it, expect } from "vitest"
import type { FindOrderByStatusRepository } from "."
import type { Order } from "../../../../domain/entities/order/order"
import { OrderStatus } from "../../../../domain/entities/order/order"

describe("FindOrderByStatusRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an array of Order or null", async () => {
        // Mock implementation
        class MockFindOrderByStatusRepository implements FindOrderByStatusRepository {
            async execute(status: string): Promise<Order[] | null> {
                if (status === OrderStatus.RECEIVED) {
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
                    ]
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindOrderByStatusRepository()
        const orders = await repo.execute(OrderStatus.RECEIVED)
        expect(Array.isArray(orders)).toBe(true)
        expect(orders?.length).toBe(1)
        expect(orders?.[0].status).toBe(OrderStatus.RECEIVED)
        const notFound = await repo.execute("NON_EXISTENT_STATUS")
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
