import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Order, OrderStatus } from "../../../../domain/entities/order/order"
import { OrderItemModel } from "../order-item/model"

@Entity("order")
export class OrderModel extends BaseEntity implements Order {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({ type: "int", nullable: true })
    clientId?: number

    @OneToMany(() => OrderItemModel, item => item.order, { cascade: true, eager: true })
    items!: OrderItemModel[]

    @Column({ type: "enum", enum: OrderStatus })
    status: OrderStatus = OrderStatus.RECEIVED

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    statusUpdatedAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date = new Date()

    @Column({ type: "decimal", precision: 10, scale: 2 })
    totalAmount: number = 0

    @Column({ type: "varchar", nullable: true })
    pickupCode?: string
}
