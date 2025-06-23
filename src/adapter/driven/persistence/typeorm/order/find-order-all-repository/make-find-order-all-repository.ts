import { OrderModel } from "../model"
import { FindOrderAllTypeORMRepository } from "./find-order-all-repository"
import dataSource from "../.."

export const makeFindOrderAllRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const orderRepository = dataSource.getRepository(OrderModel)
    return new FindOrderAllTypeORMRepository(orderRepository)
}
