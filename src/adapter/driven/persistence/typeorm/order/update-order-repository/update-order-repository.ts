import { Repository } from "typeorm"
import { UpdateOrderRepository } from "../../../../../../core/application/port/order/update-order-repository"
import { Order } from "../../../../../../core/domain/order/order"
import { OrderModel } from "../model"
import { OrderItemModel } from "../../order-item/model"

export class TypeOrmUpdateOrderRepository implements UpdateOrderRepository {
    constructor(private readonly repository: Repository<OrderModel>) {}

    async execute(param: { id: Order["id"]; clientId?: Order["clientId"]; items?: Order["items"]; status?: Order["status"]; statusUpdatedAt?: Order["statusUpdatedAt"]; totalAmount?: Order["totalAmount"]; pickupCode?: Order["pickupCode"] }): Promise<Order | null> {
        const { id, clientId, items, status, statusUpdatedAt, totalAmount, pickupCode } = param;
        const order = await this.repository.findOne({ where: { id }, relations: ["items"] });
        if (!order) return null;
        if (clientId !== undefined) order.clientId = clientId;
        if (items !== undefined) {
            order.items = items.map(item => Object.assign(new OrderItemModel(), item));
        }
        if (status !== undefined) order.status = status;
        if (statusUpdatedAt !== undefined) order.statusUpdatedAt = statusUpdatedAt;
        if (totalAmount !== undefined) order.totalAmount = totalAmount;
        if (pickupCode !== undefined) order.pickupCode = pickupCode;
        order.updatedAt = new Date();
        await this.repository.save(order);
        return order;
    }

    finish() {
        return this.repository.manager.connection.destroy();
    }
}
