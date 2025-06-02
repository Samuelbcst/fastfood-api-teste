import { OrderModel } from "../model"
import { TypeOrmUpdateOrderRepository } from "./update-order-repository"
import dataSource from "../.."

export const makeUpdateOrderRepository = async () => {
    await dataSource.initialize()
    const orderRepository = dataSource.getRepository(OrderModel)
    return new TypeOrmUpdateOrderRepository(orderRepository)
}
