import { makeCreateOrderItemUseCase } from "../../../../../../core/application/use-case/order-item/create-order-item/make-create-order-item-use-case"
import { makeCreateOrderItemRepository } from "../../../../../driven/persistence/typeorm/order-item/create-order-item-repository/make-create-order-item-repository"

export const makeCreateOrderItemFactory = async () => {
    const repository = await makeCreateOrderItemRepository()
    const useCase = makeCreateOrderItemUseCase(repository)
    return useCase
}
