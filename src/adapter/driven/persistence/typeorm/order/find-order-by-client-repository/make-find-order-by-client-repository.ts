import { OrderModel } from "../model"
import { FindOrderByClientTypeORMRepository } from "./find-order-by-client-repository"
import dataSource from "../.."

export const makeFindOrderByClientRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const orderRepository = dataSource.getRepository(OrderModel)
    return new FindOrderByClientTypeORMRepository(orderRepository)
}
