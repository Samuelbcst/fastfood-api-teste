import { Repository } from "typeorm"
import { FindOrderItemAllRepository } from '../../../../../../core/application/port/order-item/find-order-item-all-repository'
import { OrderItem } from '../../../../../../core/domain/order-item'
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
