import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { Product } from "../../../../../core/domain/product"
import { CategoryModel } from "../category/model"

@Entity("product")
export class ProductModel extends BaseEntity implements Product {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column()
    name: string = ""

    @Column({ nullable: true })
    description?: string

    @Column("float")
    price: number = 0

    @Column()
    categoryId: number = 0

    @ManyToOne(() => CategoryModel, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
    @JoinColumn({ name: "categoryId" })
    category?: CategoryModel

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date = new Date()

    @Column({ nullable: true })
    active?: boolean
}
