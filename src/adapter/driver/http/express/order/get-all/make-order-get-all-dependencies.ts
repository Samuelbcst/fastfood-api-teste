import { makeFindOrderAllUseCase } from "../../../../../../core/application/use-case/order/find-order-all/make-find-order-all-use-case"
import { makeFindOrderAllRepository } from "../../../../../driven/persistence/typeorm/order/find-order-all-repository/make-find-order-all-repository"

export const makeGetOrderAllFactory = async () => {
    const repository = await makeFindOrderAllRepository()
    const useCase = makeFindOrderAllUseCase(repository)
    return useCase
}
