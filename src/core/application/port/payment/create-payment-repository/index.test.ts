import { describe, it, expect } from "vitest"
import type { CreatePaymentRepository } from "."
import type { Payment } from "../../../../../core/domain/payment/payment"

describe("CreatePaymentRepository", () => {
    it("should define a create method that returns a Payment and a finish method", async () => {
        // Mock implementation
        class MockCreatePaymentRepository implements CreatePaymentRepository {
            async create(input: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
                return {
                    id: 1,
                    ...input,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockCreatePaymentRepository()
        const input = { orderId: 2, paymentStatus: "PAID", paidAt: new Date() }
        const payment = await repo.create(input as any)
        expect(payment.id).toBe(1)
        expect(payment.orderId).toBe(2)
        expect(payment.paymentStatus).toBe("PAID")
        expect(payment.paidAt).toBeInstanceOf(Date)
        expect(payment.createdAt).toBeInstanceOf(Date)
        expect(payment.updatedAt).toBeInstanceOf(Date)
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
