import { makeDeleteOrderItemUseCase } from "../../../../../../application/use-cases/order-item/delete-order-item/make-delete-order-item-use-case"
import { makeDeleteOrderItemRepository } from "../../../../../../infrastructure/database/typeorm/order-item/delete-order-item-repository/make-delete-order-item-repository"

export const makeDeleteOrderItemFactory = async () => {
    const deleteOrderItemRepository = await makeDeleteOrderItemRepository()
    const useCase = makeDeleteOrderItemUseCase(deleteOrderItemRepository)
    return useCase
}
