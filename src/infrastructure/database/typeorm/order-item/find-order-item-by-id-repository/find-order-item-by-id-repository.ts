import { Repository } from "typeorm"
import { OrderItem } from "../../../../../domain/entities/order-item/order-item"
import { OrderItemModel } from "../model"
import { FindOrderItemByIdRepository } from "../../../../../application/repositories/order-item/find-order-item-by-id-repository"

export class FindOrderItemByIdTypeORMRepository
    implements FindOrderItemByIdRepository
{
    constructor(private readonly repository: Repository<OrderItemModel>) {}

    execute(id: OrderItem["id"]) {
        return this.repository.findOneBy({ id })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
