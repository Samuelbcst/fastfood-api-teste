import { Repository } from 'typeorm/repository/Repository'
import { CreateOrderItemRepository } from '../../../../../application/ports/order-item/create-order-item-repository'
import { BaseEntity } from '../../../../../domain/entities/base-entity'
import { OrderItem } from '../../../../../domain/entities/order-item/order-item'
import { OrderItemModel } from '../model'

export class TypeOrmCreateOrderItemRepository implements CreateOrderItemRepository {
    constructor(private readonly repository: Repository<OrderItemModel>) {}

    async create(orderItem: Omit<OrderItem, keyof BaseEntity>): Promise<OrderItem> {
        const orderItemModel = OrderItemModel.create(orderItem as Partial<OrderItemModel>)
        await orderItemModel.save()
        return orderItemModel as OrderItemModel as OrderItem
    }

    async finish(): Promise<void> {
        await this.repository.manager.connection.destroy()
    }
}
