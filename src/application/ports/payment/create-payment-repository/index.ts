import { Payment } from "../../../../domain/entities/payment/payment"
import { BaseEntity } from "../../../../domain/entities/base-entity"

export interface CreatePaymentRepository {
    create(input: Omit<Payment, keyof BaseEntity>): Promise<Payment>
    finish(): Promise<void>
}
