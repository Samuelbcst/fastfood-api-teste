import { makeDeleteOrderItemUseCase } from "../../../../../../core/application/use-case/order-item/delete-order-item/make-delete-order-item-use-case"
import { makeDeleteOrderItemRepository } from "../../../../../driven/persistence/typeorm/order-item/delete-order-item-repository/make-delete-order-item-repository"

export const makeDeleteOrderItemFactory = async () => {
    const deleteOrderItemRepository = await makeDeleteOrderItemRepository()
    const useCase = makeDeleteOrderItemUseCase(deleteOrderItemRepository)
    return useCase
}
