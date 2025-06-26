import { Repository } from "typeorm"
import { Order } from "../../../../../domain/entities/order/order"
import { OrderModel } from "../model"
import { FindOrderByClientRepository } from "../../../../../application/ports/order/find-order-by-client-repository"

export class FindOrderByClientTypeORMRepository implements FindOrderByClientRepository {
    constructor(private readonly repository: Repository<OrderModel>) {}

    async execute(clientId: number): Promise<Order[]> {
        return this.repository.find({ where: { clientId }, relations: ["items"] })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
