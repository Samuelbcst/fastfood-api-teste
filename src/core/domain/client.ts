import { BaseEntity } from "./base-entity"

export interface Client extends BaseEntity {
    name: string
    description?: string
    email: string
    phone: string
}
