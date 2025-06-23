import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { Product } from "../../../../../core/domain/product/product"
import { CategoryModel } from "../category/model"

@Entity("product")
export class ProductModel extends BaseEntity implements Product {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({ type: "varchar" })
    name: string = ""

    @Column({ type: "varchar", nullable: true })
    description?: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number = 0

    @Column({ type: "int" })
    categoryId: number = 0

    @ManyToOne(() => CategoryModel, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
    @JoinColumn({ name: "categoryId" })
    category?: CategoryModel

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date = new Date()

    @Column({ type: "boolean", nullable: true })
    active?: boolean
}
