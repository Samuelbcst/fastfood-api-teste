import { OrderItemModel } from "../model"
import { DeleteOrderItemTypeORMRepository } from "./delete-order-item-repository"
import dataSource from "../../"

export const makeDeleteOrderItemRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const orderItemRepository = dataSource.getRepository(OrderItemModel)
    return new DeleteOrderItemTypeORMRepository(orderItemRepository)
}
