import { Repository } from "typeorm"
import { Order } from "../../../../../../core/domain/order/order"
import { OrderModel } from "../model"
import { DeleteOrderRepository } from "../../../../../../core/application/port/order/delete-order-repository"

export class DeleteOrderTypeORMRepository implements DeleteOrderRepository {
    constructor(private readonly repository: Repository<OrderModel>) {}

    async execute(param: { id: Order["id"] }): Promise<Order | null> {
        const { id } = param;
        const order = await this.repository.findOneBy({ id });
        if (!order) return null;
        await this.repository.remove(order);
        return order;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
