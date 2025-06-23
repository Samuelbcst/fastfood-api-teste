import { Payment } from "../../../../../core/domain/payment/payment"
import { BaseEntity } from "../../../../domain/base-entity"

export interface CreatePaymentRepository {
    create(input: Omit<Payment, keyof BaseEntity>): Promise<Payment>
    finish(): Promise<void>
}
