import { Client } from "../../../../domain/entities/client/client"
import { BaseEntity } from "../../../../domain/entities/base-entity"

export interface CreateClientRepository {
    create(input: Omit<Client, keyof BaseEntity>): Promise<Client>
    finish(): Promise<void>
}
