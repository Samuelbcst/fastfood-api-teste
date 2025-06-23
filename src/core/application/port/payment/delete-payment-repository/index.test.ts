import { describe, it, expect } from "vitest"
import type { DeletePaymentRepository } from "."
import type { Payment } from "../../../../domain/payment/payment"

describe("DeletePaymentRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning a Payment or null", async () => {
        // Mock implementation
        class MockDeletePaymentRepository implements DeletePaymentRepository {
            async execute(param: { id: number }): Promise<Payment | null> {
                if (param.id === 1) {
                    return {
                        id: 1,
                        orderId: 2,
                        paymentStatus: "PAID",
                        paidAt: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    } as Payment
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockDeletePaymentRepository()
        const found = await repo.execute({ id: 1 })
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.paymentStatus).toBe("PAID")
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
