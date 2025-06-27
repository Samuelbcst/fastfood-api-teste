import { Repository } from "typeorm"
import { FindOrderItemAllRepository } from '../../../../../application/repositories/order-item/find-order-item-all-repository'
import { OrderItem } from '../../../../../domain/entities/order-item/order-item'
import { OrderItemModel } from '../model'

export class FindOrderItemAllTypeORMRepository implements FindOrderItemAllRepository {
    constructor(private readonly repository: Repository<OrderItemModel>) {}

    async execute(): Promise<OrderItem[]> {
        return this.repository.find()
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
