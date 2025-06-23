import { Order } from "../../../../domain/order/order"
import { BaseEntity } from "../../../../domain/base-entity"

export interface CreateOrderRepository {
    create(input: Omit<Order, keyof BaseEntity>): Promise<Order>
    finish(): Promise<void>
}
