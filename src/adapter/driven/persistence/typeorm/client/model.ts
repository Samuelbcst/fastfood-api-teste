import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { Client } from "../../../../../core/domain/client"

@Entity("client")
export class ClientModel extends BaseEntity implements Client {
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
}
