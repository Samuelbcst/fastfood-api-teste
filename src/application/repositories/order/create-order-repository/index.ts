import { Order } from "../../../../domain/entities/order/order"
import { BaseEntity } from "../../../../domain/entities/base-entity"

export interface CreateOrderRepository {
    create(input: Omit<Order, keyof BaseEntity>): Promise<Order>
    finish(): Promise<void>
}
