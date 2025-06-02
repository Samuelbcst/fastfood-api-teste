import { Repository } from "typeorm"
import { Order } from "../../../../../../core/domain/order"
import { OrderModel } from "../model"
import { FindOrderAllRepository } from "../../../../../../core/application/port/order/find-order-all-repository"

export class FindOrderAllTypeORMRepository implements FindOrderAllRepository {
    constructor(private readonly repository: Repository<OrderModel>) {}

    async execute(): Promise<Order[]> {
        return this.repository.find({ relations: ["items"] })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
