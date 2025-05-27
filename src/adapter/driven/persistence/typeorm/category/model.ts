import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { Category } from "../../../../../core/domain/category"

@Entity("category")
export class CategoryModel extends BaseEntity implements Category {
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
