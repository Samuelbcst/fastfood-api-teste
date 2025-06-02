import { makeFindOrderItemAllUseCase } from "../../../../../../core/application/use-case/order-item/find-order-item-all/make-find-order-item-all-use-case"
import { makeFindOrderItemAllRepository } from "../../../../../driven/persistence/typeorm/order-item/find-order-item-all-repository/make-find-order-item-all-repository"

export const makeGetOrderItemAllFactory = async () => {
    const repository = await makeFindOrderItemAllRepository()
    const useCase = makeFindOrderItemAllUseCase(repository)
    return useCase
}
