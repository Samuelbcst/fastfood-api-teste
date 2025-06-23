import { Repository } from "typeorm"
import { Order } from "../../../../../../core/domain/order/order"
import { OrderModel } from "../model"
import { FindOrderByIdRepository } from "../../../../../../core/application/port/order/find-order-by-id-repository"

export class TypeOrmFindOrderByIdRepository implements FindOrderByIdRepository {
    constructor(private readonly repository: Repository<OrderModel>) {}

    async execute(id: Order["id"]): Promise<Order | null> {
        return this.repository.findOne({ where: { id }, relations: ["items"] })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
