import { OrderItem } from '../../../../domain/order-item/order-item'
import { BaseEntity } from "../../../../domain/base-entity"

export interface CreateOrderItemRepository {
    create(input: Omit<OrderItem, keyof BaseEntity>): Promise<OrderItem>
    finish(): Promise<void>
}