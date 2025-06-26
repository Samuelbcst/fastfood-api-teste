import { makeUpdateOrderItemUseCase } from "../../../../../../application/use-cases/order-item/update-order-item/make-update-order-item-use-case"
import { makeUpdateOrderItemRepository } from "../../../../../../infrastructure/database/typeorm/order-item/update-order-item-repository/make-update-order-item-repository"

export const makeUpdateOrderItemFactory = async () => {
    const updateOrderItemRepository = await makeUpdateOrderItemRepository()
    const useCase = makeUpdateOrderItemUseCase(updateOrderItemRepository)
    return useCase
}
