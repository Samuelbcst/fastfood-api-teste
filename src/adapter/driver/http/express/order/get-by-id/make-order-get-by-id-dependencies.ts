import { makeFindOrderByIdUseCase } from "../../../../../../core/application/use-case/order/find-order-by-id/make-find-order-by-id-use-case"
import { makeFindOrderByIdRepository } from "../../../../../driven/persistence/typeorm/order/find-order-by-id-repository/make-find-order-by-id-repository"

export const makeGetOrderByIdFactory = async () => {
    const repository = await makeFindOrderByIdRepository()
    const useCase = makeFindOrderByIdUseCase(repository)
    return useCase
}
