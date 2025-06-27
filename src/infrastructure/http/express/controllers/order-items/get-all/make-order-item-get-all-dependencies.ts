import { makeFindOrderItemAllUseCase } from "../../../../../../application/use-cases/order-item/find-order-item-all/make-find-order-item-all-use-case"
import { makeFindOrderItemAllRepository } from "../../../../../../infrastructure/database/typeorm/order-item/find-order-item-all-repository/make-find-order-item-all-repository"

export const makeGetOrderItemAllFactory = async () => {
    const repository = await makeFindOrderItemAllRepository()
    const useCase = makeFindOrderItemAllUseCase(repository)
    return useCase
}
