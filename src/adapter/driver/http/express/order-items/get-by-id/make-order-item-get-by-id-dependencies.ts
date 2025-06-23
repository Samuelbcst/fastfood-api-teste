import { makeFindOrderItemByIdUseCase } from "../../../../../../core/application/use-case/order-item/find-order-item-by-id/make-find-order-item-by-id-use-case"
import { makeFindOrderItemByIdRepository } from "../../../../../driven/persistence/typeorm/order-item/find-order-item-by-id-repository/make-find-order-item-by-id-repository"

export const makeGetOrderItemByIdFactory = async () => {
    const repository = await makeFindOrderItemByIdRepository()
    const useCase = makeFindOrderItemByIdUseCase(repository)
    return useCase
}
