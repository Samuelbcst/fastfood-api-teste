import { Repository } from "typeorm/repository/Repository"
import { CreateOrderRepository } from "../../../../../application/repositories/order/create-order-repository"
import { BaseEntity } from "../../../../../domain/entities/base-entity"
import { Order } from "../../../../../domain/entities/order/order"
import { OrderModel } from "../model"

export class TypeOrmCreateOrderRepository
    implements CreateOrderRepository
{
    constructor(private readonly repository: Repository<OrderModel>) {}

    async create(input: Omit<Order, keyof BaseEntity>): Promise<Order> {
        const order = OrderModel.create(input as Partial<OrderModel>)
        await order.save()
        return order as OrderModel as Order
    }

    async finish(): Promise<void> {
        await this.repository.manager.connection.destroy()
    }
}
