import { OrderItemModel } from "../model"
import { TypeOrmCreateOrderItemRepository } from "./create-order-item-repository"
import dataSource from "../.."

export const makeCreateOrderItemRepository = async () => {
    await dataSource.initialize()
    const orderItemRepository = dataSource.getRepository(OrderItemModel)
    return new TypeOrmCreateOrderItemRepository(orderItemRepository)
}
