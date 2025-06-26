import { Repository } from "typeorm"
import { OrderItem } from "../../../../../domain/entities/order-item/order-item"
import { OrderItemModel } from "../model"
import { UpdateOrderItemRepository } from "../../../../../application/ports/order-item/update-order-item-repository"

export class UpdateOrderItemTypeORMRepository implements UpdateOrderItemRepository {
    constructor(private readonly repository: Repository<OrderItemModel>) {}

    async execute(param: { id: OrderItem["id"]; quantity?: OrderItem["quantity"]; price?: OrderItem["unitPrice"]; orderId?: OrderItem["orderId"]; productId?: OrderItem["productId"] }): Promise<OrderItem | null> {
        const { id, quantity, price, orderId, productId } = param;
        const orderItem = await this.repository.findOneBy({ id });
        if (!orderItem) return null;
        if (quantity !== undefined) orderItem.quantity = quantity;
        if (price !== undefined) orderItem.unitPrice = price;
        if (orderId !== undefined) orderItem.orderId = orderId;
        if (productId !== undefined) orderItem.productId = productId;
        orderItem.updatedAt = new Date();
        await this.repository.save(orderItem);
        return orderItem;
    }

    finish() {
        return this.repository.manager.connection.destroy();
    }
}
