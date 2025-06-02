import { OrderModel } from "../model"
import { TypeOrmFindOrderByIdRepository } from "./find-order-by-id-repository"
import dataSource from "../.."

export const makeFindOrderByIdRepository = async () => {
    await dataSource.initialize()
    const orderRepository = dataSource.getRepository(OrderModel)
    return new TypeOrmFindOrderByIdRepository(orderRepository)
}
