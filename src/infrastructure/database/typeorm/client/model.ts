import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { Client } from "../../../../domain/entities/client/client"

@Entity("client")
export class ClientModel extends BaseEntity implements Client {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({ type: "varchar" })
    name: string = ""

    @Column({ type: "varchar" })
    email: string = ""

    @Column({ type: "varchar" })
    cpf: string = ""

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date = new Date()

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date = new Date()
}
