import { BaseEntity } from "./base-entity"

export interface Order extends BaseEntity {
    productId: number
    quantity: number
    total: number
}
