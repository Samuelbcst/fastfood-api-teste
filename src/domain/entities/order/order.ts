import { BaseEntity } from "../base-entity"
import { OrderItem } from "../order-item/order-item"

export enum OrderStatus {
    RECEIVED = "RECEIVED",
    PREPARING = "PREPARING",
    READY = "READY",
    FINISHED = "FINISHED"
}

export interface Order extends BaseEntity {
    clientId?: number
    items: OrderItem[]
    status: OrderStatus
    createdAt: Date
    statusUpdatedAt: Date
    totalAmount: number
    pickupCode?: string
}
