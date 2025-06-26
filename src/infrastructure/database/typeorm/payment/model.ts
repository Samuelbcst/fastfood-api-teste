import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { Payment, PaymentStatus } from "../../../../domain/entities/payment/payment"
import { OrderModel } from "../order/model"

@Entity("payment")
export class PaymentModel extends BaseEntity implements Payment {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({ type: "int" })
    orderId: number = 0

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number = 0

    @OneToOne(() => OrderModel)
    @JoinColumn({ name: "orderId" })
    order?: OrderModel

    @Column({ type: "varchar", length: 16, default: "NOT_PAID" })
    paymentStatus: PaymentStatus = PaymentStatus.NOT_PAID

    @Column({ type: "timestamp", nullable: true })
    paidAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date = new Date()
}

