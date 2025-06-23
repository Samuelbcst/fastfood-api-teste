import { OrderModel } from "../model"
import { FindOrderByStatusTypeORMRepository } from "./find-order-by-status-repository"
import dataSource from "../.."

export const makeFindOrderByStatusRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const orderRepository = dataSource.getRepository(OrderModel)
    return new FindOrderByStatusTypeORMRepository(orderRepository)
}
