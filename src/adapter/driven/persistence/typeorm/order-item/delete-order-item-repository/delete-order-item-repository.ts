import { Repository } from "typeorm"
import { OrderItem } from "../../../../../../core/domain/order-item"
import { OrderItemModel } from "../model"
import { DeleteOrderItemRepository } from "../../../../../../core/application/port/order-item/delete-order-item-repository"

export class DeleteOrderItemTypeORMRepository implements DeleteOrderItemRepository {
    constructor(private readonly repository: Repository<OrderItemModel>) {}

    async execute(param: { id: OrderItem["id"] }): Promise<OrderItem | null> {
        const { id } = param;
        const orderItem = await this.repository.findOneBy({ id });
        if (!orderItem) return null;
        await this.repository.remove(orderItem);
        return orderItem;
    }

    async finish(): Promise<void> {
        await this.repository.manager.connection.destroy();
    }
}
