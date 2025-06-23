import { describe, it, expect } from "vitest"
import { Payment, PaymentStatus } from "./payment"

describe("Payment", () => {
    it("should have id, orderId, paymentStatus, paidAt, createdAt, updatedAt", () => {
        const now = new Date()
        const payment: Payment = {
            id: 1,
            orderId: 10,
            amount: 100.00,
            paymentStatus: PaymentStatus.PAID,
            paidAt: now,
            createdAt: now,
            updatedAt: now,
        }
        expect(payment.id).toBe(1)
        expect(payment.orderId).toBe(10)
        expect(payment.paymentStatus).toBe(PaymentStatus.PAID)
        expect(payment.paidAt).toBe(now)
        expect(payment.createdAt).toBe(now)
        expect(payment.updatedAt).toBe(now)
    })

    it("should allow NOT_PAID status", () => {
        const now = new Date()
        const payment: Payment = {
            id: 2,
            orderId: 20,
            amount: 50.00,
            paymentStatus: PaymentStatus.NOT_PAID,
            paidAt: now,
            createdAt: now,
            updatedAt: now,
        }
        expect(payment.paymentStatus).toBe(PaymentStatus.NOT_PAID)
    })
})
