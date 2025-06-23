import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { OrderItem } from "../../../../../core/domain/order-item/order-item"
import { OrderModel } from "../order/model"
import { ProductModel } from "../product/model"

@Entity("order_item")
export class OrderItemModel extends BaseEntity implements OrderItem {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({ type: "int" })
    orderId: number = 0

    @Column({ type: "int" })
    productId: number = 0

    @Column({ type: "varchar" })
    productName: string = ""

    @Column({type: "decimal", precision: 10, scale: 2 })
    unitPrice: number = 0

    @Column("int")
    quantity: number = 0

    @ManyToOne(() => OrderModel, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "orderId" })
    order?: OrderModel

    @ManyToOne(() => ProductModel, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
    @JoinColumn({ name: "productId" })
    product?: ProductModel

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date = new Date()
}
