import { OrderItemModel } from "../model"
import { FindOrderItemAllTypeORMRepository } from "./find-order-item-all-repository"
import dataSource from "../.."

export const makeFindOrderItemAllRepository = async () => {
    await dataSource.initialize()
    const orderItemRepository = dataSource.getRepository(OrderItemModel)
    return new FindOrderItemAllTypeORMRepository(orderItemRepository)
}
