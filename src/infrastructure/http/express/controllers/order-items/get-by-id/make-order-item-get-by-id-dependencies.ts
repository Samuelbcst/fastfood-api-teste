import { makeFindOrderItemByIdUseCase } from "../../../../../../application/use-cases/order-item/find-order-item-by-id/make-find-order-item-by-id-use-case"
import { makeFindOrderItemByIdRepository } from "../../../../../../infrastructure/database/typeorm/order-item/find-order-item-by-id-repository/make-find-order-item-by-id-repository"

export const makeGetOrderItemByIdFactory = async () => {
    const repository = await makeFindOrderItemByIdRepository()
    const useCase = makeFindOrderItemByIdUseCase(repository)
    return useCase
}
