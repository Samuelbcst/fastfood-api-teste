import { BaseEntity } from "./base-entity"

export enum PaymentStatus {
    PAID = "PAID",
    NOT_PAID = "NOT_PAID"
}

export interface Payment extends BaseEntity {
    orderId: number
    paymentStatus: PaymentStatus
    paidAt: Date
}
