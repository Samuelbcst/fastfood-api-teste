import { OrderModel } from "../model"
import { TypeOrmCreateOrderRepository } from "./create-order-repository"
import dataSource from "../.."

export const makeCreateOrderRepository = async () => {
    await dataSource.initialize()
    const orderRepository = dataSource.getRepository(OrderModel)
    return new TypeOrmCreateOrderRepository(orderRepository)
}
