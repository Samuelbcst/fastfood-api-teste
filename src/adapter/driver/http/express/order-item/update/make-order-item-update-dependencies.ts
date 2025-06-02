import { makeUpdateOrderItemUseCase } from "../../../../../../core/application/use-case/order-item/update-order-item/make-update-order-item-use-case"
import { makeUpdateOrderItemRepository } from "../../../../../driven/persistence/typeorm/order-item/update-order-item-repository/make-update-order-item-repository"

export const makeUpdateOrderItemFactory = async () => {
    const updateOrderItemRepository = await makeUpdateOrderItemRepository()
    const useCase = makeUpdateOrderItemUseCase(updateOrderItemRepository)
    return useCase
}
