import { BaseEntity } from "./base-entity"

export interface Client extends BaseEntity {
    name: string
    email: string
    cpf: string
}
