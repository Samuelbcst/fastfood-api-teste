import { describe, it, expect } from "vitest"
import type { UpdateOrderRepository } from "."
import type { Order } from "../../../../domain/entities/order/order"
import { OrderStatus } from "../../../../domain/entities/order/order"

describe("UpdateOrderRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, updating and returning an Order or null", async () => {
        // Mock implementation
        class MockUpdateOrderRepository implements UpdateOrderRepository {
            async execute(param: { id: number; clientId?: string | number; items?: Order["items"]; status?: Order["status"]; createdAt?: Date; statusUpdatedAt?: Date; totalAmount?: number; pickupCode?: string }): Promise<Order | null> {
                if (param.id === 1) {
                    return {
                        id: 1,
                        items: param.items ?? [],
                        status: param.status ?? OrderStatus.RECEIVED,
                        createdAt: param.createdAt ?? new Date(),
                        updatedAt: new Date(),
                        statusUpdatedAt: param.statusUpdatedAt ?? new Date(),
                        totalAmount: param.totalAmount ?? 0,
                        clientId: param.clientId as number | undefined,
                        pickupCode: param.pickupCode,
                    }
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockUpdateOrderRepository()
        const updated = await repo.execute({ id: 1, clientId: 2, items: [], status: OrderStatus.FINISHED, totalAmount: 200, pickupCode: "XYZ789" })
        expect(updated).toBeDefined()
        expect(updated?.id).toBe(1)
        expect(updated?.clientId).toBe(2)
        expect(updated?.status).toBe(OrderStatus.FINISHED)
        expect(updated?.totalAmount).toBe(200)
        expect(updated?.pickupCode).toBe("XYZ789")
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
