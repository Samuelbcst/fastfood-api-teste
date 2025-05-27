import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { Product } from "../../../../../core/domain/product"

@Entity("product")
export class ProductModel extends BaseEntity implements Product {
    @Column("decimal", { precision: 10, scale: 2 })
    price: number = 0

    @Column()
    category: string = ""
    
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
}
