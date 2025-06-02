import { OrderItemModel } from "../model"
import { UpdateOrderItemTypeORMRepository } from "./update-order-item-repository"
import dataSource from "../.."

export const makeUpdateOrderItemRepository = async () => {
    await dataSource.initialize()
    const orderItemRepository = dataSource.getRepository(OrderItemModel)
    return new UpdateOrderItemTypeORMRepository(orderItemRepository)
}
