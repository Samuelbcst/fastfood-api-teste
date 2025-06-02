import { OrderModel } from "../model"
import { DeleteOrderTypeORMRepository } from "./delete-order-repository"
import dataSource from "../.."

export const makeDeleteOrderRepository = async () => {
    await dataSource.initialize()
    const orderRepository = dataSource.getRepository(OrderModel)
    return new DeleteOrderTypeORMRepository(orderRepository)
}
