import { Repository } from "typeorm"
import { Order, OrderStatus } from "../../../../../domain/entities/order/order"
import { OrderModel } from "../model"
import { FindOrderByStatusRepository } from "../../../../../application/ports/order/find-order-by-status-repository"

export class FindOrderByStatusTypeORMRepository implements FindOrderByStatusRepository {
    constructor(private readonly repository: Repository<OrderModel>) {}

    async execute(status: string): Promise<Order[]> {
        return this.repository.find({ where: { status: status as OrderStatus }, relations: ["items"] })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
