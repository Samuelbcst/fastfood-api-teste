import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { Order } from "../../../../../core/domain/order"

@Entity("order")
export class OrderModel extends BaseEntity implements Order {
    @Column()
    email: string = ""

    @Column()
    phone: string = ""
    
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column()
    name: string = ""

    @Column({ nullable: true })
    description?: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date = new Date()

    @Column()
    productId: number = 0

    @Column()
    quantity: number = 0

    @Column("decimal")
    total: number = 0
}
