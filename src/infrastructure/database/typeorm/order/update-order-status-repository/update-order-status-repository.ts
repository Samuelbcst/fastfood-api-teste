import { Repository } from "typeorm";
import { UpdateOrderStatusRepository } from "../../../../../application/repositories/order/update-order-status-repository";
import { Order } from "../../../../../domain/entities/order/order";
import { OrderModel } from "../model";

export class TypeOrmUpdateOrderStatusRepository implements UpdateOrderStatusRepository {
  constructor(private readonly repository: Repository<OrderModel>) {}

  async execute(param: { id: Order["id"]; status: Order["status"] }): Promise<Order | null> {
    const { id, status } = param;
    const order = await this.repository.findOne({ where: { id } });
    if (!order) return null;
    order.status = status;
    order.statusUpdatedAt = new Date();
    order.updatedAt = new Date();
    await this.repository.save(order);
    return order;
  }

  async finish() {
    await this.repository.manager.connection.destroy();
  }
}
