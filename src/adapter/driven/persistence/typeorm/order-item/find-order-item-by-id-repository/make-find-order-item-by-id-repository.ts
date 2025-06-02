import { OrderItemModel } from "../model"
import { FindOrderItemByIdTypeORMRepository } from "./find-order-item-by-id-repository"
import dataSource from "../.."

export const makeFindOrderItemByIdRepository = async () => {
    await dataSource.initialize()
    const orderItemRepository = dataSource.getRepository(OrderItemModel)
    return new FindOrderItemByIdTypeORMRepository(orderItemRepository)
}
