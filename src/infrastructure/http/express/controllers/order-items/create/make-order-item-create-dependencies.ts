import { makeCreateOrderItemUseCase } from "../../../../../../application/use-cases/order-item/create-order-item/make-create-order-item-use-case"
import { makeCreateOrderItemRepository } from "../../../../../../infrastructure/database/typeorm/order-item/create-order-item-repository/make-create-order-item-repository"

export const makeCreateOrderItemFactory = async () => {
    const repository = await makeCreateOrderItemRepository()
    const useCase = makeCreateOrderItemUseCase(repository)
    return useCase
}
