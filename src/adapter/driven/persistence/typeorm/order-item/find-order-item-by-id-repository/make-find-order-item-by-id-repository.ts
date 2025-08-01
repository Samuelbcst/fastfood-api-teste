import { OrderItemModel } from "../model"
import { FindOrderItemByIdTypeORMRepository } from "./find-order-item-by-id-repository"
import dataSource from "../.."

export const makeFindOrderItemByIdRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const orderItemRepository = dataSource.getRepository(OrderItemModel)
    return new FindOrderItemByIdTypeORMRepository(orderItemRepository)
}
