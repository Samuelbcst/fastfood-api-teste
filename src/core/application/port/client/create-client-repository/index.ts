import { Client } from "../../../../../core/domain/client"
import { BaseEntity } from "../../../../domain/base-entity"

export interface CreateClientRepository {
    create(input: Omit<Client, keyof BaseEntity>): Promise<Client>
    finish(): Promise<void>
}
