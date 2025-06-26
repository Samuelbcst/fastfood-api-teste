import { BaseEntity } from "../base-entity"


export interface OrderItem extends BaseEntity {
    orderId: number
    productId: number
    productName: string
    unitPrice: number
    quantity: number
}
